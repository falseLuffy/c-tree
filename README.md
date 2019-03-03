### 基于vue开发的树形图

### 可选参数
```
   data:Array  [{name:'',children:[]}]
   property:Object  {name:'name',children:'children'}
   icon:
```
### 使用方法：
```
   <c-tree :data="data"></tree>

   import CTree from './c-tree.js'
   {
    components:{
       CTree
    }
   }
```
   或
```
   <script src="./c-tree.js"></script>
   <script>
    Vue.component('demo',{
        template:'<div>'+
         '<c-tree :data="data"></tree>'+
        '</div>',
        data:function(){
            return {
              data:[
                      {
                         name: '开始开始开',
                         childrens: [
                            {
                               name: '开始2',
                               childrens: [
                                  {
                                     name: '开始2'
                                  },
                                  {
                                     name: '开始2'
                                  },
                               ]
                            },
                            {
                               name: '开始2',
                               childrens: [
                                  {
                                     name: '开始2'
                                  },
                                  {
                                     name: '开始2'
                                  },
                               ]
                            },
                            {
                               name: '开始2'
                            },
                            {
                               name: '开始2'
                            },
                         ]
                      },
                      {
                         name: '开始开始开始开始开始开始开始',
                         childrens: [
                            {
                               name: '开始2'
                            },
                            {
                               name: '开始2'
                            }
                         ]
                      },
                   ],
            }
        }
    })
   </script>
```
