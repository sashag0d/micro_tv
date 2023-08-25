
class ManagmentUiCategory{
  
  borderCategory= {
    left:0,
    right:6
  };

  NumberVisibleElements = 7;

  objctsChannels = {};

  objctsCategories = [];
  
  menuStatus = false;

  menuListChannels = false;
  
  playerStatus = true;

  channelPositon = 0;

  ParentTagMenu = document.getElementById('id-open-menu');

  ParentTagCategory = document.getElementById('id-colum-category');

  ParentTagChannel = document.getElementById('id-colum-channel');
  
  ParentTagVideo =  document.getElementById('tv-source');

  TagNameVideo =  document.getElementsByTagName('video')[0];

  constructor(dataCategory,dataChannels){
    this.dataCategory = dataCategory;
    this.dataChannels = dataChannels;
    this.lengthDataCategory = dataCategory.length;
    this.lengthDataChannels = dataChannels.channels.length;
    window.addEventListener('keydown', e => { 
    console.log(e.key);
    if (e.key == 'ArrowUp') this.onKeyDownUp();
    if (e.key == 'ArrowDown') this.onKeyDownDown();
    if (e.key == 'ArrowLeft') this.onKeyDownLeft();
    if (e.key == 'ArrowRight') this.onKeyDownRight();
    if (e.key == 'Enter') this.onKeyDowEnter();
    });
  };

  createObjctsCategories(){
    let value = this.dataCategory;
    let baseCategoryElem = {
      id:0,
      name:"All channels",
      statusActive: true
    };
    this.objctsCategories.push(baseCategoryElem);
    for(let i = 0;i<this.lengthDataCategory;i++){
      let newElem = {
        id:value[i].id,
        name:value[i].name,
        statusActive:false,
      }
      if(newElem.name.length >20) newElem.name = newElem.name.slice(0,16)+'...';
      this.objctsCategories.push(newElem);
    };
  };
  
  createObjctsChannels(){

    for(let i = 0; i<this.lengthDataCategory+1; i++){//+1 т.к была добавлена категория All channels
      this.objctsChannels[this.objctsCategories[i].name] = [];
    };

    for(let i = 0; i<this.lengthDataChannels; i++){
      let id = this.dataChannels.channels[i].category_id;
      let nameCategory = this.dataChannels.channels[i].program_category;
      nameCategory = this.checkIdAndCtegoryChannel(id,nameCategory);
      this.objctsChannels[nameCategory].push({
        icon:this.dataChannels.channels[i].icon,
        url: this.dataChannels.channels[i].url
      });
    };
  };

  checkIdAndCtegoryChannel(id,category) {

    let resultCategory = '';
    if(id == null && (this.objctsCategories.map(e=>e.name).indexOf(category) != -1)){
      resultCategory = category
    }else if(id != null){
      let idex = this.objctsCategories.map(e=>e.id).indexOf(id);
      resultCategory = this.objctsCategories[idex].name;
    }
    else {
      resultCategory = "All channels";
    }
    return resultCategory;
  };

  createMenuCategories(){ // создания списка категорий
    let parentTagElement = this.ParentTagCategory;
    for(let i=0; i<this.NumberVisibleElements; i++){
      let tdNameCategory = document.createElement('td');
      tdNameCategory.textContent = this.objctsCategories[i].name;
      tdNameCategory.classList.add('td-category');
      tdNameCategory.setAttribute('id',`id-td-category-${i}`);
      if(this.objctsCategories[i].statusActive == true){
        tdNameCategory.classList.add('td-category-focus');
      };
      parentTagElement.appendChild(tdNameCategory);
    };
  };

  createListMenu(){ //создания списка каналов при выборе категории
    let parentTagChannel = this.ParentTagChannel;
    let selectedCategory = document.getElementsByClassName('td-category-focus');
    let nameSelectedCatetory = selectedCategory[0].textContent;
    let arrObjChannels = this.objctsChannels[nameSelectedCatetory];
    if(arrObjChannels.length == 0){
      let tdElementChannel = document.createElement('td');
      tdElementChannel.textContent = 'No channels in category';
      parentTagChannel.appendChild(tdElementChannel);
    }

    if(arrObjChannels.length >this.NumberVisibleElements){
      
      for (let i = 0; i < this.NumberVisibleElements; i++) {
        let tdElementChannel = this.createElemtFromChannnels(i,arrObjChannels);
        parentTagChannel.appendChild(tdElementChannel);

      };
    }else{
      for (let i = 0; i < arrObjChannels.length; i++) {
        let tdElementChannel = this.createElemtFromChannnels(i,arrObjChannels);
        parentTagChannel.appendChild(tdElementChannel);
      };
    };
  };

  onKeyDownLeft(){
    if(this.menuStatus && this.menuListChannels){
      let removeClassByElem = document.getElementsByClassName('td-channel-focus');
      let positionFocusElem = removeClassByElem[0].id.slice(-1);
      let nextPositonFocusEelem = Number(positionFocusElem)-1;
      if(nextPositonFocusEelem <= 0) nextPositonFocusEelem = 0;
      removeClassByElem[0].classList.remove('td-channel-focus');
      let addClassByElem = document.getElementById(`id-td-channel-${nextPositonFocusEelem}`);
      addClassByElem.classList.add('td-channel-focus'); 
    }
    else if(this.menuStatus ){
        let removeClassByElem = document.getElementsByClassName('td-category-focus');
        let nameFocus = removeClassByElem[0].textContent;
        removeClassByElem[0].classList.remove('td-category-focus');
        let nextPositionElement = this.objctsCategories.map(e=>e.name).indexOf(nameFocus)-1
        if(nextPositionElement<0){nextPositionElement = 0};
        if(this.borderCategory.left>nextPositionElement){
            let removeElemByond = document.getElementById(`id-td-category-${this.borderCategory.right}`);
            removeElemByond.parentNode.removeChild(removeElemByond);
            this.borderCategory.right -= 1;
            this.createElementByCategories(nextPositionElement,false);
            this.borderCategory.left -= 1;
        }else{
        let addClassByElem = document.getElementById(`id-td-category-${nextPositionElement}`);
        addClassByElem.classList.add('td-category-focus');
        };
    }else{
      this.channelPositon -= 1;
      if(this.channelPositon<0) this.channelPositon = this.dataChannels.channels.length-1;
      this.playVideo();
    }
    
  };
  
  onKeyDownRight(){
      if(this.menuStatus && this.menuListChannels){
        let parentElement = this.ParentTagChannel
        let countChildrenElement = parentElement.childElementCount;
        let removeClassByElem = document.getElementsByClassName('td-channel-focus');
        let positionFocusElem = removeClassByElem[0].id.slice(-1);
        let nextPositonFocusEelem = Number(positionFocusElem)+1;
        if(nextPositonFocusEelem >= countChildrenElement){
          nextPositonFocusEelem = countChildrenElement-1;
        }
        removeClassByElem[0].classList.remove('td-channel-focus');
        let addClassByElem = document.getElementById(`id-td-channel-${nextPositonFocusEelem}`);
        addClassByElem.classList.add('td-channel-focus');
      }
      else if(this.menuStatus){
          let removeClassByElem = document.getElementsByClassName('td-category-focus');
          let nameFocus = removeClassByElem[0].textContent;
          removeClassByElem[0].classList.remove('td-category-focus');
          let nextPositionElement = this.objctsCategories.map(e=>e.name).indexOf(nameFocus)+1;
          if(nextPositionElement>this.objctsCategories.length-1){ nextPositionElement = this.objctsCategories.map(e=>e.name).indexOf(nameFocus)};
          if(this.borderCategory.right<nextPositionElement && nextPositionElement<this.objctsCategories.length){
              let removeElemByond = document.getElementById(`id-td-category-${this.borderCategory.left}`);
              removeElemByond.parentNode.removeChild(removeElemByond);
              this.borderCategory.left += 1;
              this.createElementByCategories(nextPositionElement,true);
              this.borderCategory.right += 1;

          }else{
          let addClassByElem = document.getElementById(`id-td-category-${nextPositionElement}`);
          addClassByElem.classList.add('td-category-focus');
          };
        } 
      else{
        this.channelPositon += 1;
        if(this.channelPositon> this.lengthDataChannels-1) this.channelPositon = 0;
        this.playVideo();
      };
      
  };
  
  onKeyDownDown(){

    if(this.menuStatus && this.menuListChannels == false){
      this.createListMenu();
      this.menuListChannels = true;
    };
  };

  onKeyDownUp(){
      let menuVision = this.ParentTagMenu;
      if(this.menuStatus && this.menuListChannels){
          let removeChildElemets = this.ParentTagChannel;
          removeChildElemets.textContent = '';
          this.menuListChannels = false;
      }else if(this.menuStatus){
          menuVision.style.opacity = "0";
          this.menuStatus = false;
          
      }else{
          menuVision.style.opacity = "0.8";
          this.menuStatus = true;
      }
  };

  onKeyDowEnter(){
    if(this.menuListChannels){
      let categoryChannels = document.getElementsByClassName('td-category-focus');
      let nameCategory = categoryChannels[0].textContent;
      let positionChannel = document.getElementsByClassName('td-channel-focus')[0].id.slice(-1);
      let url = this.objctsChannels[nameCategory][positionChannel].url;
      this.playVideo(url);
    }
    else if(this.playerStatus){
      document.getElementsByTagName('video')[0].pause();
      this.playerStatus = false;
    }else{
      document.getElementsByTagName('video')[0].play();
      this.playerStatus = true;
    };
    
  };

  createElementByCategories(nextPosition,check){
    let newElemWhithinBorders = document.createElement('td');
    newElemWhithinBorders.textContent = this.objctsCategories[nextPosition].name;
    newElemWhithinBorders.classList.add('td-category');
    newElemWhithinBorders.classList.add('td-category-focus');
    newElemWhithinBorders.setAttribute('id',`id-td-category-${nextPosition}`);
    let parentTagElement = this.ParentTagCategory;
    if(check){
        parentTagElement.appendChild(newElemWhithinBorders);
    }else{
        parentTagElement.prepend(newElemWhithinBorders);
    }
    
    
  };

  createElemtFromChannnels(index,arrObj){
    let tdElement = document.createElement('td');
    tdElement.classList.add('td-channel');
    if(index == 0) tdElement.classList.add('td-channel-focus');
    tdElement.setAttribute('id',`id-td-channel-${index}`);
    let imgIcon = document.createElement('img');
    imgIcon.classList.add('img-channel')
    imgIcon.src = arrObj[index].icon;
    tdElement.appendChild(imgIcon);
    return tdElement;
  };

  playVideo(url){
    if(url != undefined){
     this.ParentTagVideo.setAttribute('src', url);
      this.TagNameVideo.load();
      this.TagNameVideo.play();
      }else{
      let channelsUrl = this.dataChannels.channels[this.channelPositon].url;
      this.ParentTagVideo.setAttribute('src', channelsUrl);
      this.TagNameVideo.load();
      this.TagNameVideo.play();
      };
  };

};


function button_navigation_in(){
  let button_nav_in =  document.getElementById('nav-button-for-menu_list');
  button_nav_in.classList.add('anim-nav');
};

function button_navigation_out(){
  let button_nav_out =  document.getElementById('nav-button-for-menu_list');
  button_nav_out.className = '';
  button_nav_out.classList.add('out-anim-nav');
};

window.onload = function() {
  let dataFromRequest ={};
  let urlSession = 'login/'
  let authSession = new RequestApi(urlSession);
  
  let resultRequestAuth = authSession.requestResult;
    
  resultRequestAuth.then(
    response=>{ 
      let authkey = response.authkey;
      dataFromRequest.auth = authkey;
      return authkey;
    }
  )
  .then(
    authkey=>{
      let paramsCategoryList={
        authkey:authkey,
        client_id:1
      };
      let urlCategoryList = 'category/list/';
      let requestCategoryList = new RequestApi(urlCategoryList,paramsCategoryList);
      return requestCategoryList.requestResult;
    }    
  )
  .then(
    resultCategoryList=>{
      dataFromRequest.categoryList = resultCategoryList.categories; 
      let urlChannelList = 'channel/list/';
      let paramsChannelList = {
        authkey:dataFromRequest.auth,
        client_id:1,
        icon_width:100,
        icon_height:100,
      };
      let requestChannelList = new RequestApi(urlChannelList,paramsChannelList);
      return requestChannelList.requestResult
    }
  )
  .then(
    resultChannelList=>{
      dataFromRequest.channelList = resultChannelList;
      let menu = new ManagmentUiCategory(dataFromRequest.categoryList,dataFromRequest.channelList);
      let processedRequsets = new ProcessedRequests(dataFromRequest.categoryList,dataFromRequest.channelList.channels );
      processedRequsets.createListObjectCategories();
      processedRequsets.createListObjectChannels();
      processedRequsets.createGroupedObjects();
      let resultProcessed = processedRequsets.LisObjectsForMenu
      let interface = new MenuRenderAndNavigation(resultProcessed[0],resultProcessed[1],resultProcessed[2]);
      interface.RenderMenuElements(); 
     
      menu.createObjctsCategories();
      menu.createMenuCategories();
      menu.createObjctsChannels();
      menu.playVideo();
      button_navigation_in();
      setTimeout(button_navigation_out,5000);
    }
  )
};

