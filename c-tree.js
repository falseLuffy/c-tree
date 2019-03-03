(function (window) {

   var iconPlus = {
      template:'<svg t="1551587767530" class="svg-icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"\n' +
      '     p-id="6976" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">\n' +
      '   <defs>\n' +
      '      <style type="text/css"></style>\n' +
      '   </defs>\n' +
      '   <path\n' +
      '     d="M73.142857 146.724571v730.550858C73.142857 917.942857 106.057143 950.857143 146.724571 950.857143h730.550858C917.942857 950.857143 950.857143 917.942857 950.857143 877.275429V146.724571C950.857143 106.057143 917.942857 73.142857 877.275429 73.142857H146.724571C106.057143 73.142857 73.142857 106.057143 73.142857 146.724571z m-73.142857 0C0 65.682286 65.609143 0 146.724571 0h730.550858C958.317714 0 1024 65.609143 1024 146.724571v730.550858A146.651429 146.651429 0 0 1 877.275429 1024H146.724571A146.651429 146.651429 0 0 1 0 877.275429V146.724571z"\n' +
      '     fill="#D9D9D9" p-id="6977"></path>\n' +
      '   <path d="M330.313143 472.868571h370.249143a34.304 34.304 0 1 1 0 68.608H330.313143a34.304 34.304 0 1 1 0-68.608z"\n' +
      '         fill="#D9D9D9" p-id="6978"></path>\n' +
      '   <path d="M552.009143 324.315429v370.249142a34.304 34.304 0 1 1-68.608 0V324.315429a34.304 34.304 0 1 1 68.608 0z"\n' +
      '         fill="#D9D9D9" p-id="6979"></path>\n' +
      '</svg>'
   };
   var iconMinus = {
      template:'<svg t="1551588433319" class="svg-icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"\n' +
      '     p-id="7102" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">\n' +
      '   <defs>\n' +
      '      <style type="text/css"></style>\n' +
      '   </defs>\n' +
      '   <path\n' +
      '     d="M0 0m146.285714 0l731.428572 0q146.285714 0 146.285714 146.285714l0 731.428572q0 146.285714-146.285714 146.285714l-731.428572 0q-146.285714 0-146.285714-146.285714l0-731.428572q0-146.285714 146.285714-146.285714Z"\n' +
      '     fill="#1A90FF" p-id="7103"></path>\n' +
      '   <path\n' +
      '     d="M292.571429 475.428571m36.571428 0l365.714286 0q36.571429 0 36.571428 36.571429l0 0q0 36.571429-36.571428 36.571429l-365.714286 0q-36.571429 0-36.571428-36.571429l0 0q0-36.571429 36.571428-36.571429Z"\n' +
      '     fill="#FFFFFF" p-id="7104"></path>\n' +
      '</svg>'
   }
   var CTreeNode = {
      template: '<div class="c-tree">\n' +
      '    <div class="item" :class="{active:check}" @click.prevent.stop="handleClick">\n' +
      '      <template v-if="data[property.children]&&data[property.children].length">\n' +
      '        <template v-if="!icon">' +
      '           <icon-minus v-if="expand_"></icon-minus>\n' +
      '           <icon-plus  v-else></icon-plus>' +
      '        </template>' +
      '        <template v-else>' +
      '           <i class="iconfont icon-shuzhankai shuzhankai"  v-if="expand_"></i>\n' +
      '           <i class="iconfont  icon-shushouqi shushouqi" v-else></i>\n' +
      '        </template>' +
      '      </template>\n' +
      '      <span class="word" :title="data[property.name]">{{data[property.name]}}</span>\n' +
      '      <div class="button-wrap"><slot name="buttons"></slot></div>'  +
      '    </div>\n' +
      '    <div class="c-children" v-show="expand_" v-if="data[property.children]&&data[property.children].length">\n' +
      '      <c-tree-node :data="child" :expand="false" :property="property" ref="tree" v-for="(child,index) in data[property.children]" :key="index" @check="handleCheck">' +
      '      <slot name="buttons" slot="buttons"></slot>' +
      '      </c-tree-node>\n' +
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
               (this.$refs.tree||[]).forEach(function (tree) {
                  tree.broadcast(data)
               })
            }
            else {
               return
            }
         }
      },
      components: {
         CTreeNode: CTreeNode,
         iconPlus:iconPlus,
         iconMinus:iconMinus
      }
   };


   var CTree = {
      template: '<div>\n' +
      '    <c-tree-node v-for="(tree,index) in data" v-bind:data="tree" :property="property" ref="tree" :key="index" @check="handleCheck">' +
      '      <slot name="buttons" slot="buttons"></slot>' +
      '     </c-tree-node>\n' +
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

   var style = ' .c-tree{\n' +
     '      line-height:22px;\n' +
     '      font-size:14px;\n' +
     '      padding-left:5px;\n' +
     '   }\n' +
     '   .c-tree  .item {\n' +
     '      position:relative;' +
     '      overflow:hidden;' +
     '      white-space:nowrap;' +
     '      text-overflow:ellipsis;' +
     '      position: relative;\n' +
     '      left: -11px;\n' +
     '      padding: 2px 5px;\n' +
     '      cursor: pointer;\n' +
     '   }\n' +
     '   .c-tree .item:hover,.c-tree .item.active{\n' +
     '   background:#E6F7FF\n' +
     '   }\n' +
     '   .c-tree .item [class ^= \'iconfont\'] {\n' +
     '      font-size: 14px;\n' +
     '   }\n' +
     '   .c-tree .item [class ^= \'iconfont\'].shuzhankai{\n' +
     '       color:#1A90FF;\n' +
     '    }\n' +
     '   .c-tree .item [class ^= \'iconfont\'].shushouqi{\n' +
     '       color:rgba(0,0,0,0.15);\n' +
     '    }\n ' +
     '   .c-tree  .item .button-wrap{\n' +
     '      position:absolute;top:1px;right:0;visibility:hidden' +
     '   }' +
     '   .c-tree  .item:hover .button-wrap{\n' +
     '      visibility:visible;' +
     '   }'+
     '   .c-tree .c-children{\n' +
     '      padding-left:20px;\n' +
     '      border-left:1px dashed #E9E9E9;\n' +
     '   }' +
     '   .svg-icon {\n' +
     '      width: 1em;\n' +
     '      height: 1em;\n' +
     '      vertical-align: -0.15em;\n' +
     '      fill: currentColor;\n' +
     '      overflow: hidden;\n' +
     '   }';

   var el = document.createElement('style');
   el.innerHTML = style;
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
})(this);