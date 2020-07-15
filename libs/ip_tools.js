import { config } from '../config.js';
class IpTools {
    constructor(ip_restriction) {
        // Gera um ip aleatorio
        this.generate_ip = function () {
            //Faz a restrição de ips
            var first_part;
            var ip_valid = false;
            while (!ip_valid) {
                first_part = (Math.floor(Math.random() * 254) + 1);
                ip_valid = !ipIsRestricted(first_part, ip_restriction);
            }
            return first_part + "." + (Math.floor(Math.random() * 254) + 1) + "." + (Math.floor(Math.random() * 254) + 1) + "." + (Math.floor(Math.random() * 254) + 1);
        };
        var ipIsRestricted = function (ip, ip_restriction) {
            //Checa se o ip está na lista de restrição
            for (var i = ip_restriction.length - 1; i >= 0; i--) {
                for (var j = ip_restriction[i].final - 1; j >= ip_restriction[i].initial; j--) {
                    if (ip == j) {
                        return false;
                    }
                }
            }
            return true;
        };
    }
}
export default IpTools;