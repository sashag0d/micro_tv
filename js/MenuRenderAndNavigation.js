class MenuRenderAndNavigation{

    ParentTagCategory = document.getElementById('id-colum-category');
    ParentTagChannel = document.getElementById('id-colum-channel');
    TetsTagID = document.getElementById('id-test');
    NumberVisibleElements = 7;
    BorderCategory={
        left:0,
        right:6
    }

    constructor(Category,Channel,Group){
        this.Category = Category;
        this.Channel = Channel;
        this.Group = Group;
        window.addEventListener('keydown', e => { 
            console.log(e.key);
            if (e.key == 'ArrowUp') ;
            if (e.key == 'ArrowDown') ;
            if (e.key == 'ArrowLeft') ;
            if (e.key == 'ArrowRight') ;
            if (e.key == 'Enter') ;
        });
       
    };

    RenderMenuElements(id){
        
    };
    createMenuCategory(){

    };


};