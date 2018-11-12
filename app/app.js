let komodal = new Vue({
    el: '#komodal',
    data:{
        appName: 'Komodal Container Information',
        info:{
            start_datetime:null,
            end_datetime:null,
            container_number:'',
            terminal_name:null,
            appoint_type:null,
            ship_line_name:null,
            container_id:null,
            description:'',
        },        
        list_table_info: [],
        hasErr:false,
        isInvalidForm:false,
    },
    methods:{
        add_info: function()
        {
            if(!this.info.start_datetime||!this.info.end_datetime||!this.info.container_number
                ||!this.info.terminal_name||!this.info.appoint_type||!this.info.ship_line_name){
                this.isInvalidForm=true;
        }
        else if(this.info.container_number.length!=7){
            this.hasErr=true;
        }
        else
        {
            this.hasErr=false;
            this.isInvalidForm=false;
            this.generate_con_id(this.info.container_number,this.info.ship_line_name);

            const obj = Object.assign(this.info);
            this.list_table_info.push(obj);
            localStorage.setItem('list_table_info', JSON.stringify(this.list_table_info));
            this.info={};               
        }

    },
    generate_con_id: function(num,ship_name)
    {
        this.info.container_id=ship_name.substring(0, 5)+num;
    },
    edit_num: function(index){
        this.info=Object.assign(this.list_table_info[index]);
        this.list_table_info.splice(index,1);
    }
},
mounted() {
    if (localStorage.getItem("list_table_info")) {
      try {
        this.list_table_info  = JSON.parse(localStorage.getItem("list_table_info"));
    } catch(e) {
        localStorage.removeItem("list_table_info");
    }
}
}
})