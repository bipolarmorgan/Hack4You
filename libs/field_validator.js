export default FieldValidator = function(){
	this.username = {
		isValid: function(str){
			var regex = new RegExp("^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$", "g");
			return regex.test(str);
		}
	}
    this.email = {
        isValid: function(str){
            var regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$", "g");
            if(regex.test(str)){
                return true; 
            }else{
                return false;
            }
        }
    }
    this.password = {
        isValid: function(str){
            var regex = new RegExp("(?=^.{4,20}$)^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$", "g");
            if(regex.test(str)){
                return true; 
            }else{
                return false;
            }
        }
    }
}