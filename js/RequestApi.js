class RequestApi{
    _firstPartUrl = 'http://176.28.64.92/tvmiddleware/api/';
    _authKey = null;
    _authData = {
  
      api_key:'Xeigh2yai6Iuv0jataoyaech3muopaesei9eithah1eichi9OP5ce1hee0hei9Ma',
      client_id:1,
      abonement:88088,
      password:123
  
    };
    constructor(secondPartUrl,paramsRequest){
      this.secondPartUrl = secondPartUrl;
      this.paramsRequest = paramsRequest;
    };
    set auhtKeyValue(value){
      this._authKey = value;
    };
    get auhtKeyValue(){
      return this._authKey;
    }
    get requestResult(){
     
      let xhrRequest = new XMLHttpRequest();
      let fullLink = new URL (this._firstPartUrl+this.secondPartUrl);
    
      if (!this.paramsRequest){
        
        let keysParams = Object.keys(this._authData);
        for(let key of keysParams){
          fullLink.searchParams.set(key, this._authData[key])
        }
        
        xhrRequest.open('GET',fullLink);
        xhrRequest.send();
  
        return new Promise((resolve, reject) => {
          xhrRequest.onload = () => {
            if (xhrRequest.status == 200) {
              resolve(JSON.parse(xhrRequest.response));
            }
            else {
              reject(xhrRequest.response);
            }
          }
        });
      }
      else{
        let keysParams = Object.keys(this.paramsRequest);
        for(let key of keysParams){
          fullLink.searchParams.set(key,this.paramsRequest[key])
        }
  
        xhrRequest.open('GET',fullLink);
        xhrRequest.send();
  
        return new Promise((resolve, reject) => {
          xhrRequest.onload = () => {
            if (xhrRequest.status == 200) {
              resolve(JSON.parse(xhrRequest.response));
            }
            else {
              reject(xhrRequest.response);
            }
          }
        });
      };
    };
  };