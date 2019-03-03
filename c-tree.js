(function (window) {
   var CTreeNode = {
      template: '<div class="c-tree">\n' +
      '    <div class="item" :class="{active:check}" @click.prevent.stop="handleClick">\n' +
      '      <template v-if="data[property.children]&&data[property.children].length">\n' +
      '        <i class="iconfont icon-shuzhankai shuzhankai" v-if="expand_"></i>\n' +
      '        <i class="iconfont  icon-shushouqi shushouqi" v-else></i>\n' +
      '      </template>\n' +
      '      <span class="word" >{{data[property.name]}}</span>\n' +
      '    </div>\n' +
      '    <div class="c-children" v-show="expand_" v-if="data[property.children]&&data[property.children].length">\n' +
      '      <c-tree-node :data="child" :expand="false" :property="property" v-for="(child,index) in data[property.children]" :key="index" @check="handleCheck"></c-tree-node>\n' +
      '    </div>\n'+
      '</div>',
      name:'c-tree-node',
      props: {
         data: {
            type: Object
         },
         property: {
            type: Object,
            default:{
               name:'name',
               children:'children'
            }
         },
         icon: {
            type: String
         }
      },
      data: function () {
         return {
            expand_: !!(this.expand),
            check: false
         }
      },
      methods: {
         handleClick: function () {
            this.expand_ = !this.expand_;
            if (!this.data[this.property.children] || !this.data[this.property.children].length) {
               this.check = true;
               this.$emit('check', {data: this.data, path: this.data})
            }
         },
         handleCheck: function (argu) {
            var data = argu.data, path = {};
            path[this.property.children] = argu.path
            
            var temp = Object.assign({}, this.data, path);
            this.$emit('check', {path: temp, data: data});
         },
         broadcast: function (data) {
            if (data !== this.data) {
               this.check = false;
               this.$children.forEach(function (tree) {
                  tree.broadcast(data)
               })
            }
            else {
               return
            }
         }
      },
      components: {
         CTreeNode: CTreeNode
      }
   };


   var CTree = {
      template: '<div>\n' +
      '<div v-for="(tree,index) in data"></div>'+
      '    <c-tree-node v-for="(tree,index) in data" v-bind:data="tree" :property="property" ref="tree" :key="index" @check="handleCheck"></c-tree-node>\n' +
      '  </div>',
      props: {
         data: {
            type: Array,
            default: []
         },
         property: {
            type: Object,
            default:{
               name:'name',
               children:'children'
            }
         }
      },
      methods: {
         handleCheck: function (argu) {
            var data = argu.data, path = argu.path;
            this.$emit('check', {path: path, data: data});
            this.$refs.tree.forEach(function (item) {
               item.broadcast(data)
            })
         }
      },
      components: {
         CTreeNode: CTreeNode
      }
   };
   var style = ''
   el = document.createElement('style')
   el.innerHTML = style
   document.body.appendChild(el);

   if (typeof window.define === 'function' && window.define.amd !== undefined) {
      window.define('CTree', [], function () {
         return CTree;
      });
      // CommonJS suppport
   }
   else if (typeof module !== 'undefined' && module.exports !== undefined) {
      module.exports = CTree;
      // Default
   }
   else {
      window.CTree = CTree;
   }
})(this)