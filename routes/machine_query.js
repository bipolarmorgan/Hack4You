import { lang,  returnMessage } from '../lang.js';
import { config } from '../config.js';
import { microtime } from 'microtime';
//Lista de querys
import { getQuery as _getQuery } from '../libs/mysql_query_list.js';
var getQuery = _getQuery;

//Presets
var lang = new lang();
var rlang = returnMessage;

import { moment } from 'moment';

export default function(app, my){
    app.post('/api/query/machine/', function(req, res){
        //Checa linguagem
        if(!req.body.lang){
            return res.send({"status": "error", "code":1 ,"message": 'Blank Language'});
        }else{
            var lang = req.body.lang;
        }
        //User auth agent
        var rsp = global.userManager.checkUserLogin(req.body.token, res, lang);
        if(rsp == 'exit'){
            return false;
        }
        if(req.body.token && rsp){
            //Pega a maquina do player atual pelo ip e pega a maquina destino, compara o power
            if(!req.body.myip || !req.body.atackip){
                return res.send(rlang(lang, 21));
            }
            //Faz join para pegar o balance
            my.query(getQuery(1), req.body.myip, function (error, own_machine, fields) {
                if (error) {
                    console.log(error);
                    return res.send(rlang(lang, 15));
                }else if(own_machine.lenght <= 0){
                    return res.send(rlang(lang, 19));
                }else{
                    //Checa se a maquina atacante é sua
                    own_machine = own_machine[0];
                    if(own_machine.id_user == global.loggedUsers.get(req.body.token).id_user){
                        //Checa os bots
                        var atacked = global.machineBots.get(req.body.atackip);
                        if(req.body.atackip == req.body.myip){
                            return res.send(rlang(lang, 22));
                        }
                        if(atacked){
                            if(own_machine.scan > atacked.firewall){
                                return res.send({"status": "success", "machine": atacked});
                            }else{
                                return res.send(rlang(lang, 20));
                            }
                        }else{
                            my.query(getQuery(1), req.body.atackip, function (error, atacked, fields) {
                                //Checa se os status da sua maquina vs atacado
                                if(error){//Avisa se a machine com este ip não existe
                                    return res.send(rlang(lang, 15));
                                }else if(atacked.length === undefined || atacked.length <= 0){
                                    return res.send(rlang(lang, 19));
                                }else if(own_machine.scan > atacked.firewall){
                                    atacked = atacked[0];
                                    return res.send({"status": "success", "machine": atacked});
                                }else{
                                    return res.send(rlang(lang, 20));
                                }
                            });
                        }
                    }else{
                        return res.send(rlang(lang, 18));
                    }
                }
            });
        }else{
            return res.send(rlang(lang, 16));
        }
    });
}
