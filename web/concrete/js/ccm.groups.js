!function(a){var b={"private":{dragRequest:function(b,c,d){var e=c.parent.data.key;"over"==d&&(e=c.data.key),jQuery.fn.dialog.showLoader();var f=[{name:"sourceTreeNodeID",value:b.data.key},{name:"treeNodeParentID",value:e}],g=c.parent.getChildren();if(g)for(i=0;i<g.length;i++){var h=g[i];f.push({name:"treeNodeID[]",value:h.data.key})}a.ajax({dataType:"json",type:"POST",data:f,url:CCM_TOOLS_PATH+"/tree/node/drag_request",success:function(a){ccm_parseJSON(a,function(){}),jQuery.fn.dialog.hideLoader()}})},getMenu:function(b){var c='<div class="ccm-popover-menu popover fade"><div class="arrow"></div><div class="popover-inner">';c+='<ul class="dropdown-menu">',b.canEditTreeNode&&"group"==b.treeNodeTypeHandle&&b.gID&&(c+='<li><a href="'+CCM_DISPATCHER_FILENAME+"/dashboard/users/groups/-/edit/"+b.gID+'">Edit Group</a></li>'),b.canEditTreeNodePermissions&&(c+='<li><a class="dialog-launch" dialog-width="480" dialog-height="380" dialog-modal="true" dialog-title="Edit Permissions" href="'+CCM_TOOLS_PATH+"/tree/node/permissions?treeNodeID="+b.key+'">Edit Permissions</a></li>'),c+="</ul></div></div>";var d=a(c);return 0==d.find("li").length?!1:d},reloadNode:function(a,b){var c={url:CCM_TOOLS_PATH+"/tree/node/load",data:{treeNodeParentID:a.data.key},success:function(){b&&b()}};a.appendAjax(c)},setupDialogForm:function(b,c){b.closest(".ui-dialog").find("button[type=submit]").on("click",function(){b.trigger("submit")}),b.on("submit",function(){jQuery.fn.dialog.showLoader();var d=b.serializeArray();return a.ajax({dataType:"json",type:"post",data:d,url:b.attr("action"),success:function(a){1==a.error?ConcreteAlert.notice("Error",'<div class="alert alert-danger">'+a.messages.join("<br>")+"</div>"):(jQuery.fn.dialog.closeTop(),c(a))},error:function(a){ConcreteAlert.notice("Error",'<div class="alert alert-danger">'+a.responseText+"</div>")},complete:function(){jQuery.fn.dialog.hideLoader()}}),!1})}},initAddNodeForm:function(c){b.private.setupDialogForm(a(this),function(b){var d=a("[data-group-tree="+c+"]");if(b.length)for(i=0;i<b.length;i++){var e=d.dynatree("getTree").getNodeByKey(b[i].treeNodeParentID);e.addChild(b[i])}else{var e=d.dynatree("getTree").getNodeByKey(b.treeNodeParentID);e.addChild(b)}e.expand()})},initUpdateGroupNodeForm:function(c){b.private.setupDialogForm(a(this),function(b){var d=a("[data-group-tree="+c+"]"),e=d.dynatree("getTree").getNodeByKey(b.key);e.data=b,e.render()})},initRemoveNodeForm:function(c){b.private.setupDialogForm(a(this),function(b){var d=a("[data-group-tree="+c+"]"),e=d.dynatree("getTree").getNodeByKey(b.treeNodeID);e.remove()})},init:function(c){var c=a.extend({readonly:!1,chooseNodeInForm:!1,onSelect:!1,onClick:!1,selectNodeByKey:!1,removeNodesByID:[],disableDragAndDrop:!1},c),d=!1,e=!1;if(c.treeNodeParentID)var f={treeNodeParentID:c.treeNodeParentID};else var f={treeID:c.treeID};var g=!0;c.chooseNodeInForm&&(d=!0,g=!1,e={checkbox:"dynatree-radio"},c.selectNodeByKey&&(f.treeNodeSelectedID=c.selectNodeByKey)),"multiple"===c.chooseNodeInForm&&(d=!0,g=!1,e={checkbox:"dynatree-checkbox"},c.selectNodeByKey&&(f.treeNodeSelectedID=c.selectNodeByKey)),c.allChildren&&(f.allChildren=!0);var h=1;c.selectMode&&(h=c.selectMode);var j=2;return c.minExpandLevel&&(j=c.minExpandLevel),this.each(function(){if(c.treeNodeParentID)var g=CCM_TOOLS_PATH+"/tree/node/load";else var g=CCM_TOOLS_PATH+"/tree/load";var k=a(this);k.data("options",c),k.dynatree({autoFocus:!1,onSelect:function(a,b){c.chooseNodeInForm&&c.onSelect(a,b)},selectMode:h,checkbox:d,classNames:e,minExpandLevel:j,clickFolderMode:1,initAjax:{url:g,type:"post",data:f},onLazyRead:function(a){b.private.reloadNode(a)},onPostInit:function(){var b=k;if(c.removeNodesByID.length)for(i=0;i<c.removeNodesByID.length;i++){var d=c.removeNodesByID[i],e=this.getNodeByKey(d);e&&e.remove()}if(c.readonly&&b.dynatree("disable"),c.chooseNodeInForm){var f=b.dynatree("getTree"),f=f.getSelectedNodes();if(f[0]){var e=f[0];c.onSelect(!0,e)}}if(f){a.map(f,function(a){a.makeVisible()})}},onClick:function(d,e){if(c.onClick&&"title"==d.getEventTargetType(e))return c.onClick(e,d),!1;if("expander"==d.getEventTargetType(e))return!0;if(c.chooseNodeInForm&&"checkbox"!=d.getEventTargetType(e))return!1;if(!d.getEventTargetType(e))return!1;if(!c.chooseNodeInForm&&"title"==d.getEventTargetType(e)&&!c.noMenu){var f=b.private.getMenu(d.data,c);if(f){var g=new ConcreteMenu(a(d.span),{menu:f,launcher:"none"});g.show(e)}}},dnd:{onDragStart:function(){return c.disableDragAndDrop?!1:!0},onDragStop:function(){},autoExpandMS:1e3,preventVoidMoves:!0,onDragEnter:function(){return!0},onDragOver:function(a,b,c){return"0"==a.data.treeNodeParentID&&"over"!=c?!1:a.isDescendantOf(b)?!1:!0},onDrop:function(a,c,d){c.move(a,d),b.private.dragRequest(c,a,d)}}})})}};a.fn.ccmgroupstree=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?(a.error("Method "+c+" does not exist on jQuery.ccmgroupstree"),void 0):b.init.apply(this,arguments)}}(jQuery,window);