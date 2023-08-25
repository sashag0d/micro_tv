class ProcessedRequests{

    DataInObjectChannel = [];
    DataInObjectCategory = [];
    GroupedObjects = new Map(); // объект каналов сгруппированных по категориям 

    constructor(categoryRequestData,channelRequestData){
        this.categoryRequestData = categoryRequestData;
        this.channelRequestData = channelRequestData;
        this.lengthCategoryRequestData = this.categoryRequestData.length;
        this.lengthChannelRequestData = this.channelRequestData.length;
    };

    createListObjectCategories(){
      this.DataInObjectCategory.push({
        id:0,
        elemShowScreen:'All',
        channelsCount: this.lengthChannelRequestData      
      });

      for (let index = 0; index < this.lengthCategoryRequestData ; index++) {
        let categoryNewElem = {
          id:this.categoryRequestData[index].id,
          elemShowScreen:this.categoryRequestData[index].name,
          channelsCount:this.categoryRequestData[index].channels_count
        };
        this.DataInObjectCategory.push(categoryNewElem);
      };
    };
    
    createListObjectChannels(){
      for (let index = 0; index < this.lengthChannelRequestData; index++) {
        let channelsNewElem = {
          name: this.channelRequestData[index].name,
          icon: this.channelRequestData[index].icon,
          categoryId: this.channelRequestData[index].category_id,
          url: this.channelRequestData[index].url
        };
        this.DataInObjectChannel.push(channelsNewElem);
      };
    };

    createGroupedObjects(){
      let listPositionChannel = []
      for (let index = 0; index < this.lengthChannelRequestData; index++) {
        listPositionChannel.push(index);
      }
      this.GroupedObjects.set(listPositionChannel,'All');
      for (let index = 1; index < this.lengthCategoryRequestData; index++) {
        let listChannel = this.crateListByCategory(this.DataInObjectCategory[index].id);
        this.GroupedObjects.set(listChannel,this.DataInObjectCategory[index].elemShowScreen);
        
      };
    };
    
    crateListByCategory(categoryID){
      let listChannel = []
      for(let i = 0; i<this.lengthChannelRequestData; i++){
        if(this.DataInObjectChannel[i].categoryId == categoryID){
          listChannel.push(i)
        }
      };
      return listChannel;
    };

    get LisObjectsForMenu(){
      return [this.DataInObjectCategory,this.DataInObjectChannel,this.GroupedObjects]
    };
};


