(function() {
    tinymce.create('tinymce.plugins.CodeElementPlugin', {
        init : function(ed, url) {

            ed.addCommand('mceCodeElement', function() {
                ed.execCommand('mceBeginUndoLevel');
                var e = ed.dom.getParent(ed.selection.getNode(), 'CODE');
                if (e===null){
                    if ( ed.selection.isCollapsed() ) {
                        ed.execCommand('mceInsertContent', false, " <code>code</code> ");
                    } else {
                        tinymce.activeEditor.selection.setNode(tinymce.activeEditor.dom.create(
                            'code',
                            {},
                            ed.selection.getContent()
                        ));
                    }
                } else {
                    ed.execCommand('mceRemoveNode', false, e);
                    ed.nodeChanged();
                }

                ed.execCommand('mceEndUndoLevel');
            });

            ed.addButton('codeElement', {
                title : 'Insert/edit code',
                cmd : 'mceCodeElement',
                image : url + '/img/icon.png'
            });

            ed.onNodeChange.add(function(ed, cm, n) {
                cm.setActive('codeElement', n.nodeName == 'CODE');
            });
        },

        getInfo : function() {
            return {
                longname : 'Code Element',
                author : 'Takayuki Miyauchi',
                authorurl : 'http://wpist.me/',
                infourl : '',
                version : "0.5"
            };
        }
    });

    tinymce.PluginManager.add('codeElement', tinymce.plugins.CodeElementPlugin);
})();

