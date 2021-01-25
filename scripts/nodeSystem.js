var app = app || {};
var qad = window.qad || {};

var commandManager;

InitQuestion();

function InitQuestion() {
    let headerHeight = 23;
    let bodyHeight = 71;
    let optionHeight = 30;
    let questionHeight = 130;
    let paddingBottom = 35;
    // let width = 235;

    joint.dia.Element.define('qad.Question', {
        ports: {
            groups: {
                in: {
                    id: 'in',
                    position: {
                        name: 'left',
                        args: { y: '60'}
                    },
                    attrs: {
                        circle: {
                            magnet: 'passive',
                            stroke: '#b6b6b6',
                            strokeWidth: 2,
                            fill: '#ffd6d6',
                            r: 10
                        },
                        text: {
                            pointerEvents: 'none',
                            fontSize: 12,
                        },
                        itemHighlight: {
                            'fill': '#fff'
                        }
                    },
                    markup: '<circle id="port-in"/>',

                    label: {
                        // position: {
                        //     args: { x: -6, y: -8}
                        // },
                        // attrs: {
                        //     image: {
                        //         fill: 'black'
                        //     }
                        // },
                        markup: '<image width="13" height="8" style="transform: matrix(-1,0,0,1,6,-8)" xlink:href="img/board/fork.svg"></image>'
                    }
                },
                out: {
                    position: {
                        // name: 'right',
                        args: { x: 235 }
                    },
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: '#b6b6b6',
                            fill: '#ffd6d6',
                            strokeWidth: 2,
                            r: 10
                        },
                        // rect: {
                        //     pointerEvents: 'none',
                        //     fill: 'transparent',
                        //     width: 10,
                        //     height: 20,
                        //     x: 14,
                        //     y: -10
                        // },
                        image: {
                            pointerEvents: 'none',
                        }
                    },
                    label: {
                        position: {
                            args: { x: -6, y: -8 }
                        },
                        markup: '<image width="12" height="8" xlink:href="img/board/fork.svg"></image>'
                    },
                    markup: '<circle/>'//<rect/>'
                }
            },
            // items: [{
            //     group: 'in'
            // }]
        },
        attrs: {
            '.': {
                magnet: false
            },
            '#main-back': {
                fill: '#e2f7dc',
                refWidth: '100%',
                refHeight: '100%',
                filter: 'url(#dropshadow)',
                rx: '5',
                ry: '5'
            },
            '#header #play': {
                event: 'element:play',
                x: 113,
                y: 2,
                width: 16,
                height: 19,
                cursor: 'pointer'
            },
            '#header #remove': {
                event: 'element:delete',
                x: 216,
                y: 8,
                width: 10,
                height: 9,
                cursor: 'pointer'
            },
            '#header text': {
                x: 7,
                y: 16
            },
            '#header-logo': {
                display: 'block'
            },
            '#header-logo rect': {
                fill: '#f2f2f2',
                refX: '50%',
                refX2: '-50',
                y: '-25',
                width: 100,
                height: '50',
                rx: '5',
                ry: '5',
                strokeWidth: 2,
                stroke: 'black'
            },
            '#header-logo text': {
                x: 86,
                y: -7,
                fontSize: 14,
                fontWeight: 600
            },
            '#body rect': {
                fill: '#e4f3ff',
                y: headerHeight,
                refWidth: '-6',
                x: 3,
                height: bodyHeight,
            },
            '#body #edit': {
                event: 'element:edit',
                x: 9,
                y: 32,
                width: 13,
                height: 13,
                cursor: 'pointer'
            },
            '#body #title-question': {
                x: 25,
                y: 53,
                fontSize: 14,
                fontWeight: 600
            },
            '#body #question-text': {
                x: 25,
                y: 73,
                fontSize: 14
            },
            '#footer #title-footer': {
                x: 25,
                y: 116,
                fontSize: 14,
                fontWeight: 600
            },
            '#footer rect': {
                fill: '#B6B6B6',
                x: 3,
                y: headerHeight + bodyHeight + 34,
                refWidth: '-6',
                refHeight: -headerHeight - bodyHeight - 69,
                z: -1
            },
            '#add-answer text': {
                refX: 31,
                refDy: -14,
                fontSize: 12,
            },
            '#add-answer image': {
                refX: '50%',
                refX2: '-13.5',
                refDy: -31,
                height: 26,
                width: 26,
                cursor: 'pointer'
            },

            // '.btn-add-option': {
            //     refX: 10,
            //     refDy: -22,
            //     cursor: 'pointer',
            //     fill: 'white'
            // },
            '.btn-remove-option': {
                height: 20,
                width: 20,
                x: 3,
                y: 5,
                // xAlignment: 10,
                // yAlignment: 13,
                cursor: 'pointer',
                // fill: 'white'
            },
            '.options': {
                refX: 0
            },
            // Text styling.
            text: {
                fontFamily: 'Roboto-Regular'
            },
            '.option-text': {
                fontSize: 13,
                // fontFamily: 'Roboto-Regular',
                fill: '#4b4a67',
                refX: 30,
                yAlignment: 'middle'
            },
            '.option-rect': {
                fill: '#e2f7dc',
                width: 235
            }
        }
    }, {
        markup: [
            '<g id="header-logo">',
                '<rect/>',
                '<text>Start node</text>',
            '</g>',
            '<rect id="main-back" />',
            '<g id="header">',
                '<text font-size="14">node #1</text>',
                '<image id="play" xlink:href="img/board/Play.svg"/>',
                '<image id="remove" xlink:href="img/board/cross.svg"/>',
            '</g>',
            '<g id="body">',
                '<rect/>',
                '<image id="edit" xlink:href="img/board/pen.svg"/>',
                '<text id="title-question"> Operator phrase: </text>',
                '<text id="question-text"/>',
            '</g>',
            '<g id="footer">',
                '<rect/>',
                '<text id="title-footer">Response:</text>',
                '<g id="add-answer">',
                    '<text>Add answer</text>',
                    '<image xlink:href="img/board/add-answer.svg"/>',
                '</g>',
            '</g>',
            '<g class="options"></g>',
        ].join(''),

        optionMarkup: [
            '<g class="option">',
                '<rect class="option-rect" />',
                '<image class="btn-remove-option" xlink:href="img/board/btn-remove.svg"/>',
                '<text class="option-text"/>',
            '</g>'
        ].join(''),

        initialize: function() {
            // console.log(this.get('question'));
            joint.dia.Element.prototype.initialize.apply(this, arguments);
            this.on('change:options', this.onChangeOptions, this);
            this.on('change:question', this.onChangeQuestion, this);

            this.on('change:questionHeight', function() {
                this.attr('.options/refY', questionHeight, { silent: true });
                // this.autoresize();
            }, this);

            // this.on('change:optionHeight', this.autoresize, this);

            this.attr('.options/refY', questionHeight, { silent: true });
            this.attr('#question-text/text', this.get('question').text, { silent: true });

            this.onChangeOptions();
        },
        onChangeQuestion: function() {
            let question = this.get('question');
            let newColor =  question.active ? '#FFF0BC' : '#ffd6d6';

            // try {
            //     console.log('v-----------------v')
            //     console.log(this.getPorts()[0].attrs.circle.fill);
            //     console.log(newColor);
            //     console.log('-----------------')
            // } catch{

            // }

            if(this.getPorts()[0].attrs == null || this.getPorts()[0].attrs.circle.fill != newColor)
                this.portProp( this.getPorts()[0].id , 'attrs/circle/fill', newColor);
            // this.getPorts()[0].attrs.circle.fill = newColor;


            let questionText = joint.util.measureText(question.text);
            if(questionText != this.attr('#question-text/text'))
                this.attr('#question-text/text', questionText);
        },

        onChangeOptions: function() {

            var options = this.get('options');
            // console.log(options);
            // var optionHeight = this.get('optionHeight');

            // First clean up the previously set attrs for the old options object.
            // We mark every new attribute object with the `dynamic` flag set to `true`.
            // This is how we recognize previously set attributes.
            // var attrs = this.get('attrs');
            // console.log(attrs);
            // _.each(attrs, function(attrs, selector) {

            //     if (attrs.dynamic) {
            //         // Remove silently because we're going to update `attrs`
            //         // later in this method anyway.
            //         this.removeAttr(selector, { silent: true });
            //     }
            // }.bind(this));

            // Collect new attrs for the new options.
            var offsetY = 0;
            var attrsUpdate = {};
            // var questionHeight = this.get('questionHeight');

            _.each(options, function(option) {
                // console.log(option);

                var selector = '.option-' + option.id;
                // console.log(option);
                attrsUpdate[selector] = { transform: 'translate(0, ' + offsetY + ')', dynamic: true };
                attrsUpdate[selector + ' .option-rect'] = { height: optionHeight, dynamic: true };
                attrsUpdate[selector + ' .option-text'] = { text: joint.util.measureText(option.text), dynamic: true, refY: optionHeight / 2 };

                offsetY += optionHeight;
                offsetY += 2;

                var portY = offsetY - optionHeight / 2 + questionHeight - 2;
                // console.log(this.getPorts()[0]);
                if (!this.getPort(option.id)) {
                    // console.log("add");
                    this.addPort({ group: 'out', id: option.id, args: { y: portY }});
                } else {
                    // console.log("edit");
                    this.portProp(option.id, 'args/y', portY);
                    this.portProp(option.id, 'attrs/circle/fill', option.active ? '#FFF0BC' : '#ffd6d6');
                }
            }.bind(this));
            this.attr(attrsUpdate);
            this.autoresize();
        },

        autoresize: function() {
            var options = this.get('options') || [];
            var gap = paddingBottom || 20;
            var height = options.length * optionHeight + questionHeight + gap + (options.length * 2);
            this.resize(235, height);
        },

        applyEdit: function(obj) {
            commandManager.initBatchCommand();
            _.each(obj.remove, function(id) {
                this.removePort(id);
            }.bind(this));
            this.set('options', obj.answers);
            this.set('question', obj.question);
            commandManager.storeBatchCommand();

        },

        addOption: function(option) {
            commandManager.initBatchCommand();
            var options = JSON.parse(JSON.stringify(this.get('options')));
            options.push(option);
            this.set('options', options);
            commandManager.storeBatchCommand();
        },

        removeOption: function(id) {
            commandManager.initBatchCommand();
            var options = JSON.parse(JSON.stringify(this.get('options')));
            this.removePort(id);
            this.set('options', _.without(options, _.find(options, { id: id })));
            commandManager.storeBatchCommand();
        },

        // changeOption: function(id, option) {

        //     if (!option.id) {
        //         option.id = id;
        //     }

        //     var options = JSON.parse(JSON.stringify(this.get('options')));
        //     options[_.findIndex(options, { id: id })] = option;
        //     this.set('options', options);
        // },

        changeOptionActivity: function(id, isActive) {
            commandManager.initBatchCommand();
            var options = JSON.parse(JSON.stringify(this.get('options')));
            options[_.findIndex(options, { id: id })].active = isActive;
            this.set('options', options);
            commandManager.storeBatchCommand();
        },

        changeQuestionActivity: function(isActive) {
            commandManager.initBatchCommand();
            // this.portProp( this.getPorts()[0].id , 'attrs/circle/fill', isActive ? '#FFF0BC' : '#ffd6d6');
            var question = JSON.parse(JSON.stringify(this.get('question')));
            question.active = isActive;
            this.set('question', question);
            // console.log(this.getPorts()[0].id);
            commandManager.storeBatchCommand();
        }
    });
}

joint.shapes.qad.QuestionView = joint.dia.ElementView.extend({

    events: {
        'click #add-answer image': 'onAddOption',
        'click .btn-remove-option': 'onRemoveOption'
    },

    presentationAttributes: joint.dia.ElementView.addPresentationAttributes({
        options: ['OPTIONS']
    }),

    confirmUpdate: function(flags) {
        joint.dia.ElementView.prototype.confirmUpdate.apply(this, arguments);
        if (this.hasFlag(flags, 'OPTIONS')) this.renderOptions();
    },

    renderMarkup: function() {

        joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments);

        // A holder for all the options.
        this.$options = this.$('.options');
        // Create an SVG element representing one option. This element will
        // be cloned in order to create more options.
        this.elOption = V(this.model.optionMarkup);

        this.renderOptions();
    },

    renderOptions: function() {

        this.$options.empty();
        // console.log(this.model.get('options'));

        _.each(this.model.get('options'), function(option, index) {

            var className = 'option-' + option.id;
            var elOption = this.elOption.clone().addClass(className);
            elOption.attr('option-id', option.id);
            this.$options.append(elOption.node);

        }.bind(this));

        // Apply `attrs` to the newly created SVG elements.
        this.update();
    },

    onAddOption: function() {
        this.model.addOption({
            id: _.uniqueId('option-'),
            text: 'Answer ' + (this.model.get('options').length + 1),
            active: false
        });
    },

    onRemoveOption: function(evt) {

        this.model.removeOption(V(evt.target.parentNode).attr('option-id'));
    }
});

app.Selection = Backbone.Collection.extend();

app.SelectionView = joint.mvc.View.extend({

    PADDING: 3,

    BOX_TEMPLATE: V('rect', {
        // 'fill': '#e2f7dc',
        'stroke': '#C6C7E2',
        'stroke-width': 1,
        'pointer-events': 'none'
    }),

    init: function() {
        this.listenTo(this.model, 'add reset change', this.render);
    },

    render: function() {

        _.invokeMap(this.boxes, 'remove');

        this.boxes = this.model.map(function(element) {
            return this.BOX_TEMPLATE
                .clone()
                .attr(element.getBBox().inflate(this.PADDING))
                .appendTo(this.options.paper.cells);
        }.bind(this));

        return this;
    },

    onRemove: function() {
        _.invokeMap(this.boxes, 'remove');
        delete this.boxes;
    }
});


app.Factory = {

    createQuestion: function(text, isStart) {

        let question = new joint.shapes.qad.Question({
            ports: {
                items: isStart ? [] : [{ group: 'in'}]
            },
            attrs: {
                '#header-logo': {
                    display: isStart ? 'block' : 'none'
                }
            },
            position: { x: 400 - 50, y: 30 },
            // size: { width: 100, height: 70 },
            question: { text: text, active: false},
            start: isStart,
            // inPorts: [{ id: 'in', label: 'In' }],
            options: [
                // { id: 'yes', text: 'Yes', active: false },
                // { id: 'no', text: 'No', active: false }
            ]
        });
        // delete question.attributes.ports.groups.in;
        // console.log(this.graph);
        return question;
    },

    createLink: function() {
        var link = new joint.dia.Link({
            attrs: {
                '.marker-target': {
                    d: 'M 10 0 L 0 5 L 10 10 z',
                    fill: '#6a6c8a',
                    stroke: '#6a6c8a'
                },
                '.connection': {
                    stroke: '#6a6c8a',
                    strokeWidth: 2
                }
            }
        });
        // joint.linkTools.


        // joint.dia.Link.prototype.on('change:target', function(dgsdj1,dgsdj2,dgsdj3,dgsdj4) {
        //     console.log('==========(1)============');
        //     console.log(dgsdj1);
        //     console.log(dgsdj2);
        //     console.log(dgsdj3);
        //     console.log(dgsdj4);
        //     console.log('==========)1(============');
        // });
        // joint.dia.Link.prototype.on('change:source', function(dgsdj) { console.log(dgsdj); })
        // joint.dia.Link.prototype.on('change:target', function(dgsdj) { console.log(dgsdj); })
        // link.attr('pathSelector', { connection: true, stroke: 'red', fill: 'none' });
        return link;
    },

    createDialogJSON: function(graph, startID) {

        var dialog = {
            startNode: undefined,
            nodes: [],
            links: []
        };
        _.each(graph.getCells(), function(cell) {

            var o = {
                id: cell.id,
                type: cell.get('type')
            };

            switch (cell.get('type')) {
                case 'qad.Question':
                    o.question = cell.get('question');
                    o.options = cell.get('options');
                    dialog.nodes.push(o);
                    if(!startID) {
                        if(cell.get('start'))
                            dialog.startNode = dialog.nodes.length - 1;
                    }
                    else if(startID == cell.id)
                        dialog.startNode = dialog.nodes.length - 1;
                    break;
                default: // qad.Link
                    o.source = cell.get('source');
                    o.target = cell.get('target');
                    dialog.links.push(o);
                    break;
            }
        });

        return dialog;
    }
};



let modePlay = new ModePlay();
modePlay.Initialize();

function ModePlay() {
    let that = this;
    let dialog = document.querySelector('.mode-start');
    let answers = dialog.querySelector('.mode-start__answer');
    let questionsText = dialog.querySelector('.mode-start__questions_text');
    let close = dialog.querySelector('.mode-start__header_close');

    this.Initialize = function() {
        close.onclick = closeDialog;
    }

    this.openDialog = function(graph, startID) {
        let dataJSON = app.Factory.createDialogJSON(graph, startID);
        if(!ValidConnected()) return;
        ActivityDialog(true);
        RenderDialog(dataJSON);

        function ValidConnected() {
            return dataJSON.nodes.length > 1 && dataJSON.links.length > 0;
        }
    }

    function closeDialog() {
        ActivityDialog(false);
    }

    function ActivityDialog(isActive) {
        dialog.style.display = isActive ? 'flex' : 'none';
    }

    function RenderDialog(dataNodes, node) {
        that.dataNodes = dataNodes;

        if (!node) node = dataNodes.nodes[dataNodes.startNode];
        RenderQuestion(node);
        that.currentNode = node;
    };

    function RenderQuestion(node) {
        answers.textContent = '';
        for (var i = 0; i < node.options.length; i++) {
            answers.appendChild(RenderOption(node.options[i]));
        }
        questionsText.innerHTML = node.question.text;
    };

    function RenderOption(option) {
        var elOption = CreateElement('div', 'mode-start__answer_item');
        elOption.textContent = option.text;
        let optionID = option.id;

        elOption.onclick = function() {
            OnOptionClick(optionID);
        }

        return elOption;
    };

    function OnOptionClick(optionID) {
        var outboundLink;
        for (var i = 0; i < that.dataNodes.links.length; i++) {

            var link = that.dataNodes.links[i];
            if (link.source.id === that.currentNode.id && link.source.port === optionID) {
                outboundLink = link;
                break;
            }
        }

        if (outboundLink) {
            var nextNode;
            for (var j = 0; j < that.dataNodes.nodes.length; j++) {
                var node = that.dataNodes.nodes[j];
                if (node.id === outboundLink.target.id) {
                    nextNode = node;
                    break;
                }
            }
            if (nextNode) {
                RenderDialog(that.dataNodes, nextNode);
            }
        }
    };

    function CreateElement(tagName, className) {
        var el = document.createElement(tagName);
        el.setAttribute('class', className);
        return el;
    };
}


app.AppView = joint.mvc.View.extend({

    el: '.board',

    events: {
        'click .board__create-node': 'addQuestion',
        'click .board__start': 'previewDialog',
        'click #toolbar .code-snippet': 'showCodeSnippet',
        'click #toolbar .load-example': 'loadExample',
        'click #toolbar .clear': 'clear'
    },

    init: function() {
        this.initializePaper();
        // this.initializeInlineTextEditor();
    },

    initializePaper: function() {
        // var CustomLinkView = joint.dia.LinkView.extend({
        //     options: joint.util.defaults({
        //         doubleLinkTools: true,
        //         doubleLinkToolsOffset: 40
        //     }, joint.dia.LinkView.prototype.options)
        // });


        // var removeButton = new joint.linkTools.Remove({
        //     action: function() {
        //         console.log('delete');
        //     },
        //     distance: '95%',
        //     markup: [{
        //         tagName: 'circle',
        //         selector: 'button',
        //         attributes: {
        //             'r': 10,
        //             'fill': '#f6f6f6',
        //             'stroke': '#5755a1',
        //             'stroke-width': 2,
        //             'cursor': 'pointer'
        //         }
        //     }, {
        //         tagName: 'path',
        //         selector: 'icon',
        //         attributes: {
        //             'd': 'M -4 -4 4 4 M -4 4 4 -4',
        //             'fill': 'none',
        //             'stroke': '#5755a1',
        //             'stroke-width': 4,
        //             'pointer-events': 'none'
        //         }
        //     }]
        // });

        // joint.linkTools.mapping

        // var toolsView = new joint.dia.ToolsView({
        //     name: 'basic-tools',
        //     tools: [removeButton]
        // });

        // CustomLinkView.addTools(toolsView);

        // var removeButton =

        joint.linkTools.mapping = {
            Remove: joint.linkTools.Button.extend({
                children: [{
                    tagName: 'circle',
                    selector: 'button',
                    attributes: {
                        'r': 10,
                        'fill': '#f6f6f6',
                        'stroke': '#5755a1',
                        'stroke-width': 2,
                        'cursor': 'pointer'
                    }
                }, {
                    tagName: 'path',
                    selector: 'icon',
                    attributes: {
                        'd': 'M -4 -4 4 4 M -4 4 4 -4',
                        'fill': 'none',
                        'stroke': '#5755a1',
                        'stroke-width': 4,
                        'pointer-events': 'none'
                    }
                }]
            })
        }


        joint.shapes.standard.Link.define('mapping.Link', {
            z: -1,
            attrs: {
                line: {
                    targetMarker: {
                        'type': 'path',
                        'fill': '#5755a1',
                        'd': 'M 10 -5 0 0 10 5 z'
                    },
                    stroke: 'gray'
                }
            }
        });

        this.paper = new joint.dia.Paper({
            el: this.$('#paper'),
            width: 1500,//'100%',
            height: 500,//'100%',
            gridSize: 10,
            snapLinks: {
                radius: 10
            },
            // linkView: CustomLinkView,
            interactive: { vertexAdd: false, arrowheadMove: false, useLinkTools: false },
            // defs: "test",
            linkPinning: false,
            multiLinks: false,
            defaultLink:  function() {
                return new joint.shapes.mapping.Link();
            },
            defaultRouter: { name: 'manhattan', args: { padding: 10, maxAllowedDirectionChange: 180, perpendicular: false, startDirections: ['right'], endDirections: ['left', 'right'] , maximumLoops: 2000}},
            // defaultRouter: { name: 'manhattan', args: { padding: 50 }},
            // connectionStrategy: joint.connectionStrategies.pinRelative,
            defaultConnector: { name: 'rounded', args: { radius: 7} },
            validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                // Prevent linking from input ports.
                if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
                // Prevent linking from output ports to input ports within one element.
                if (cellViewS === cellViewT) return false;
                // Prevent linking to input ports.
                return (magnetT && magnetT.getAttribute('port-group') === 'in') || (cellViewS.model.get('type') === 'qad.Question' && cellViewT.model.get('type') === 'qad.Answer');
            },
            validateMagnet: function(cellView, magnet) {
                // Note that this is the default behaviour. Just showing it here for reference.
                return magnet.getAttribute('magnet') !== 'passive';
            }
        });


        var paperScroller = new joint.ui.PaperScroller({
            autoResizePaper: true,
            padding: 1000,
            paper: this.paper,
            cursor: 'grab'
        });
        paperScroller.lock();
        this.paper.on('blank:pointerdown', paperScroller.startPanning);

        // $('.load-example').on('click', function() {
        //     paperScroller.zoom(0.2, { max: 4 });
        // });


        $('#app').append(paperScroller.render().el);
        // console.log(this.paper);
        // console.log(this.paper);
        this.paper.on('link:mouseenter', function(linkView) {
            this.removeTools();
            showLinkTools(linkView);
        })
        this.paper.on('blank:mousewheel', function(evt, x, y, delta) {
            evt.preventDefault();
            ZoomScroll(x, y, delta);
        })

        this.paper.on('cell:mousewheel', function(cellView, evt, x, y, delta) {
            evt.preventDefault();
            ZoomScroll(x, y, delta);
        })

        $('.zoom-in').on('click', function() {
            Zoom(1);
        });

        $('.zoom-out').on('click', function() {
            Zoom(-1);
        });

        function ZoomScroll(x, y, delta) {
            paperScroller.zoom(0.15 * delta, { min: 0.4, max: 2.5, grid: 0.1, ox: x, oy: y });
        }

        function Zoom(delta) {
            paperScroller.zoom(0.4 * delta, { min: 0.4, max: 2.5});
        }



        this.paper.on('link:mouseleave', function() {
            this.removeTools();
        });

        // this.paper.on('link:remove', function(linkView) {
        //     console.log('remove');
        // })



        // joint.linkTools.mapping = {
        //     Remove: removeButton
        // }

        function showLinkTools(linkView) {
            var tools = new joint.dia.ToolsView({
                tools: [
                    new joint.linkTools.mapping.Remove({
                        distance: '92%',
                        action: function() {

                            linkAction(this.model, linkView);
                        }
                    }),
                    new joint.linkTools.mapping.Remove({
                        distance: '8%',
                        action: function() {
                            linkAction(this.model, linkView);
                        }
                    })
                ]
            });
            linkView.addTools(tools);
        }

        function linkAction(link, linkView) {
            commandManager.initBatchCommand();
            linkView.targetView.model.changeQuestionActivity(false);//attributes.ports.groups.in.attrs.circle.fill = '#ffd6d6';
            linkView.sourceView.model.changeOptionActivity(linkView.sourceMagnet.getAttribute('port') , false);
            // linkView.targetMagnet.style.fill = '#ffd6d6';
            link.remove();
            commandManager.storeBatchCommand();
        }

        // var linkView1 = CustomLinkView.findView(this.paper);
        // linkView1.addTools(toolsView);

        // console.log(this.paper.properties.defs);
        this.paper.defs.innerHTML = '<filter id="dropshadow"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/></filter>';

        // [
        //     '<filter id="dropshadow">',
        //     '<feGaussianBlur in="SourceAlpha" stdDeviation="3"/> ',
        //     ' <feOffset dx="0" dy="0" result="offsetblur"/> ',
        //     '<feMerge> ',
        //         '<feMergeNode/>',
        //         '<feMergeNode in="SourceGraphic"/> ',
        //     '</feMerge>',
        //     '</filter>',
        // ].join('');

        this.paper.on("link:snap:connect", function(linkView, evt) {
            evt.stopPropagation();
            // console.log(linkView);
            // console.log(this.get('options'));
            linkView.targetView.model.changeQuestionActivity(true);// attributes.ports.groups.in.attrs.circle.fill = '#FFF0BC';
            linkView.sourceView.model.changeOptionActivity(linkView.sourceMagnet.getAttribute('port') , true);
            console.log('link:snap:connect');
            // console.log('link:snap:connect');
            // if(linkView.sourceMagnet != null)
            //     linkView.sourceMagnet.style.fill = '#FFF0BC';
            // if(linkView.targetMagnet != null)
            // linkView.targetMagnet.style.fill = '#FFF0BC';
        })
        this.paper.on("link:snap:disconnect", function(linkView, evt, elementViewDisconnected, magnet, arrowhead) {
            evt.stopPropagation();
            // console.log(evt);
            // console.log('==========(2)============');
            // console.log(linkView);
            // console.log(evt);
            // console.log(elementViewDisconnected);
            // console.log(magnet);
            // console.log(arrowhead);
            // console.log('==========)2(============');

            // if(linkView.targetView == null){
                // console.log(magnet);
                // console.log(linkView);
            if(linkView.targetView == null) {
                elementViewDisconnected.model.changeQuestionActivity(false);//attributes.ports.groups.in.attrs.circle.fill = '#ffd6d6';
                linkView.sourceView.model.changeOptionActivity(linkView.sourceMagnet.getAttribute('port') , false);
            }
            console.log('link:snap:disconnect');
                // magnet.style.fill = '#ffd6d6';
            // }
            // else {
            //     linkView.targetView.model.changeQuestionActivity(false);//attributes.ports.groups.in.attrs.circle.fill = '#ffd6d6';
            //     lelementViewDisconnected.model.changeOptionActivity(linkView.sourceMagnet.getAttribute('port') , false);
            //     linkView.sourceMagnet.style.fill = '#ffd6d6';
            // }
            // magnet.style.fill = '#ffd6d6';
            // if(linkView.sourceMagnet != null)
            //     linkView.sourceMagnet.style.fill = '#ffd6d6';
            // if(linkView.targetMagnet != null)
            //     linkView.targetMagnet.style.fill = '#ffd6d6';
        })

        // this.paper.on("cell:highlight", function(linkView) {
        //     console.log('cell:highlight');
        // })
        // this.paper.on("cell:unhighlight", function(linkView) {
        //     console.log('cell:unhighlight');
        // })
        // this.paper.on("link:connect", function(linkView) {
        //     console.log('link:snap:connect');
        // })
        // this.paper.on("link:disconnect", function(linkView) {
        //     console.log('link:snap:disconnect');
        // })
        // this.paper.on("link:connect", function(linkView) {
        //     console.log('link:connect');
        // })
        // this.paper.on("link:disconnect", function(linkView) {
        //     console.log('link:disconnect');
        // })
        // this.paper.on("link:disconnect", function(linkView) {
        //     console.log('link:disconnect');
        // })






        this.graph = this.paper.model;



        commandManager = new joint.dia.CommandManager({
            graph: this.graph,
            // cmdBeforeAdd: function(cmdName, cell, graph, options) {
            //     options = options || {};
            //     console.log('v-------------------------------------v');
            //     console.log(cmdName);
            //     console.log(cell);
            //     console.log(graph);
            //     console.log(options);
            //     console.log(options.ignoreCommandManager);
            //     console.log('-------------------------------------');
            //     return !options.ignoreCommandManager;
            // }
        });

        $('.undo').click(function() { commandManager.undo(); });
        $('.redo').click(function() { commandManager.redo(); });

        // this.graph.on('change', function(cell) {
        //     console.log('change-graph');
        // })

        this.paper.on('element:delete', function(elementView, evt, x, y) {
            evt.stopPropagation();
            elementView.model.remove();
        });

        this.paper.on('element:edit', function(elementView, evt, x, y) {
            evt.stopPropagation();
            editNodeWindow.SetListItems(elementView.model);
        });

        this.paper.on('element:play', function(elementView, evt, x, y) {
            evt.stopPropagation();
            modePlay.openDialog(this.graph, elementView.model.id);
        }, this);
        // this.paper.on('link:delete', function(elementView, evt, x, y) {
        //     console.log('link:delete');
        // });
        // this.paper.on('transition:start', function(element, pathToAttribute) {
        //     alert('transition:start');
        // });

        // var paperScroller = new joint.ui.PaperScroller({
        //     paper: this.paper,
        //     cursor: 'grab'
        // });

        // this.paper.on('blank:pointerdown', paperScroller.startPanning);

        // $('#paper-container').append(paperScroller.render().el);

    },

    // initializeInlineTextEditor: function() {

    //     var cellViewUnderEdit;

    //     var closeEditor = _.bind(function() {

    //         if (this.textEditor) {
    //             this.textEditor.remove();
    //             // Re-enable dragging after inline editing.
    //             cellViewUnderEdit.setInteractivity(true);
    //             this.textEditor = cellViewUnderEdit = undefined;
    //         }
    //     }, this);

    //     this.paper.on('cell:pointerdblclick', function(cellView, evt) {

    //         // Clean up the old text editor if there was one.
    //         closeEditor();

    //         var vTarget = V(evt.target);
    //         var text;
    //         var cell = cellView.model;

    //         switch (cell.get('type')) {

    //             case 'qad.Question':

    //                 text = joint.ui.TextEditor.getTextElement(evt.target);
    //                 if (!text) {
    //                     break;
    //                 }
    //                 if (vTarget.hasClass('body') || V(text).hasClass('question-text')) {

    //                     text = cellView.$('#question-text')[0];
    //                     cellView.textEditPath = 'question';
    //                     cellView.optionId = null;

    //                 } else if (V(text).hasClass('option-text')) {

    //                     cellView.textEditPath = 'options/' + _.findIndex(cell.get('options'), { id: V(text.parentNode).attr('option-id') }) + '/text';
    //                     cellView.optionId = V(text.parentNode).attr('option-id');

    //                 } else if (vTarget.hasClass('option-rect')) {

    //                     text = V(vTarget.node.parentNode).find('.option-text');
    //                     cellView.textEditPath = 'options/' + _.findIndex(cell.get('options'), { id: V(vTarget.node.parentNode).attr('option-id') }) + '/text';
    //                 }
    //                 break;

    //             case 'qad.Answer':
    //                 text = joint.ui.TextEditor.getTextElement(evt.target);
    //                 cellView.textEditPath = 'answer';
    //                 break;
    //         }

    //         if (text) {

    //             this.textEditor = new joint.ui.TextEditor({ text: text });
    //             this.textEditor.render(this.paper.el);

    //             this.textEditor.on('text:change', function(newText) {

    //                 var cell = cellViewUnderEdit.model;
    //                 // TODO: prop() changes options and so options are re-rendered
    //                 // (they are rendered dynamically).
    //                 // This means that the `text` SVG element passed to the ui.TextEditor
    //                 // no longer exists! An exception is thrown subsequently.
    //                 // What do we do here?
    //                 cell.prop(cellViewUnderEdit.textEditPath, newText);

    //                 // A temporary solution or the right one? We just
    //                 // replace the SVG text element of the textEditor options object with the new one
    //                 // that was dynamically created as a reaction on the `prop` change.
    //                 if (cellViewUnderEdit.optionId) {
    //                     this.textEditor.options.text = cellViewUnderEdit.$('.option.option-' + cellViewUnderEdit.optionId + ' .option-text')[0];
    //                 }

    //             }, this);

    //             cellViewUnderEdit = cellView;
    //             // Prevent dragging during inline editing.
    //             cellViewUnderEdit.setInteractivity(false);
    //         }
    //     }, this);

    //     $(document.body).on('click', _.bind(function(evt) {

    //         var text = joint.ui.TextEditor.getTextElement(evt.target);
    //         if (this.textEditor && !text) {
    //             closeEditor();
    //         }

    //     }, this));
    // },

    // initializeInlineTextEditor: function() {

    //     var cellViewUnderEdit;

    //     var closeEditor = _.bind(function() {

    //         if (this.textEditor) {
    //             this.textEditor.remove();
    //             // Re-enable dragging after inline editing.
    //             cellViewUnderEdit.setInteractivity(true);
    //             this.textEditor = cellViewUnderEdit = undefined;
    //         }
    //     }, this);

    //     this.paper.on('cell:pointerdblclick', function(cellView, evt) {

    //         // Clean up the old text editor if there was one.
    //         closeEditor();

    //         var vTarget = V(evt.target);
    //         var text;
    //         var cell = cellView.model;

    //         if (vTarget.hasClass('option-rect')){
    //             text = joint.ui.TextEditor.getTextElement(V(vTarget.node.parentNode).find('tspan')[0].node);
    //             InitTextEditor();
    //         }
    //         else if (V(vTarget.node.parentNode).hasClass('option-text')) {
    //             text = joint.ui.TextEditor.getTextElement(evt.target);
    //             InitTextEditor();
    //         }
    //         else {
    //             return;
    //         }

    //         function InitTextEditor() {
    //             cellView.textEditPath = 'options/' + _.findIndex(cell.get('options'), { id: V(text.parentNode).attr('option-id') }) + '/text';
    //             cellView.optionId = V(text.parentNode).attr('option-id');
    //         }

    //         if (text) {

    //             this.textEditor = new joint.ui.TextEditor({ text: text });
    //             this.textEditor.render(this.paper.el);

    //             this.textEditor.on('text:change', function(newText) {

    //                 var cell = cellViewUnderEdit.model;
    //                 // TODO: prop() changes options and so options are re-rendered
    //                 // (they are rendered dynamically).
    //                 // This means that the `text` SVG element passed to the ui.TextEditor
    //                 // no longer exists! An exception is thrown subsequently.
    //                 // What do we do here?
    //                 cell.prop(cellViewUnderEdit.textEditPath, newText);

    //                 // A temporary solution or the right one? We just
    //                 // replace the SVG text element of the textEditor options object with the new one
    //                 // that was dynamically created as a reaction on the `prop` change.
    //                 if (cellViewUnderEdit.optionId) {
    //                     this.textEditor.options.text = cellViewUnderEdit.$('.option.option-' + cellViewUnderEdit.optionId + ' .option-text')[0];
    //                 }

    //             }, this);

    //             cellViewUnderEdit = cellView;
    //             // Prevent dragging during inline editing.
    //             cellViewUnderEdit.setInteractivity(false);
    //         }

    //     }, this);

    //     $(document.body).on('click', _.bind(function(evt) {

    //         var text = joint.ui.TextEditor.getTextElement(evt.target);
    //         if (this.textEditor && !text) {
    //             closeEditor();
    //         }

    //     }, this));
    // },

    addQuestion: function() {
        let isStart = true;
        _.each(this.graph.attributes.cells.models, function(model) {
            if(model.attributes.start) {
                isStart = false;
                return false;
            }
        }.bind(this));
        app.Factory.createQuestion('Question', isStart).addTo(this.graph);
    },

    previewDialog: function() {
        modePlay.openDialog(this.graph);
    },

    clear: function() {
        this.graph.clear();
    },

    showCodeSnippet: function() {
        var cell = this.selection.first();
        var dialogJSON = app.Factory.createDialogJSON(this.graph, cell);

        var id = _.uniqueId('qad-dialog-');

        var snippet = '';
        snippet += '<div id="' + id + '"></div>';
        snippet += '<link rel="stylesheet" type="text/css" href="http://qad.client.io/css/snippet.css"></script>';
        snippet += '<script type="text/javascript" src="http://qad.client.io/src/snippet.js"></script>';
        snippet += '<script type="text/javascript">';
        snippet += 'document.getElementById("' + id + '").appendChild(qad.renderDialog(' + JSON.stringify(dialogJSON) + '))';
        snippet += '</script>';

        var content = '<textarea>' + snippet + '</textarea>';

        var dialog = new joint.ui.Dialog({
            width: '50%',
            height: 200,
            draggable: true,
            title: 'Copy-paste this snippet to your HTML page.',
            content: content
        });

        dialog.open();
    }
});

joint.util.measureText = function(text) {
    var svgDocument = V('svg').node;
    var textElement = V('<text><tspan></tspan></text>').node;
    var textSpan = textElement.firstChild;
    var textNode = document.createTextNode('');

    textSpan.appendChild(textNode);
    svgDocument.appendChild(textElement);
    document.body.appendChild(svgDocument);


    textNode.data = text;
    var lineWidth = textSpan.getBBox().width;

    if(lineWidth > 143) {
        let characters = text.split('');
        let newText = '';
        for (let i = 0; i < characters.length; i++) {
            newText += characters[i];
            textNode.data = newText;
            lineWidth = textSpan.getBBox().width;
            if(lineWidth >= 143) {
                V(svgDocument).remove();
                return newText + '...';
            }
        }
    }

    V(svgDocument).remove();
    return text;
};

let editNodeWindow = new EditNodeWindow();
editNodeWindow.Initialize();

function EditNodeWindow() {
    let cloneItemMain;
    let countItems;
    let lastSelect;
    let widthTextOriginal = 0;
    let nodeEdit = document.querySelector('.node-edit');
    let containerItem = nodeEdit.querySelector('.node-edit__wrapper-item');
    let сloseButton = nodeEdit.querySelector('.node-edit__header_btn');
    let body = document.querySelector('body');
    let questionItem;

    let controlData = new ControlData();
    // let textEditor = new TextEditor();

    this.Initialize = function() {
        CloneItem();
        AddButton();
        QuestionItem();
        CloseWindowButton();

        function CloneItem() {
            let itemOriginal = containerItem.querySelector('.node-edit__inner-item');
            cloneItemMain = itemOriginal.cloneNode(true);
            Reset();
        }

        function AddButton() {
            let addButton = nodeEdit.querySelector('.node-edit__add-item');
            addButton.onclick = function() {
                let answer = controlData.addAnswer();
                AddItem(answer);
            }
        }

        function QuestionItem() {
            questionItem = document.querySelector('.node-edit__operator')
                                .querySelector('.node-edit__inner-item');
        }

        function CloseWindowButton() {
            сloseButton.onclick = function() {
                controlData.ApplyEdit();
                ShowWindow(false);
            }
        }
    }

    this.SetListItems = function(model) {
        controlData.Initialize(model);
        modelGeneral = model;
        Reset();
        GenerateItems();
        ShowWindow(true);

        InitEditItem(questionItem, controlData.data.question);
        function GenerateItems() {
            _.each(controlData.data.answers, function(answer) {
                AddItem(answer);
            }.bind(this));
        }
    }

    function Reset() {
        containerItem.innerHTML = '';
        lastSelect = null;
        countItems = 0;
    }

    function AddItem(obj) {
        countItems++;
        let cloneItem = cloneItemMain.cloneNode(true);
        containerItem.appendChild(cloneItem);

        InitEvent();
        InitEditItem(cloneItem, obj);
        CheckOutVisual();

        function InitEvent() {
            cloneItem.querySelector('.node-edit__remove-item')
            .onclick = function (e) {
                e.stopPropagation();
                countItems--;
                this.parentNode.remove();
                CheckOutVisual();
                controlData.removeAnswer(obj.id);
            };
        }

        function CheckOutVisual() {
            if (countItems >= 3) containerItem.classList.add('activeScroll');
            else containerItem.classList.remove('activeScroll');
        }
    }

    function ShowWindow(isShow) {
        nodeEdit.style.display = isShow ? 'flex' : 'none';
        body.style.overflowY = isShow ? 'hidden' : 'scroll';
    }

    function InitEditItem(item, obj) {
        let containerItem = item.querySelector('.node-edit__item'),
        input = containerItem.querySelector('.node-edit__item_text'),
        buttonSave = containerItem.querySelector('.node-edit__control_start'),
        buttonCancel = containerItem.querySelector('.node-edit__control_cancel'),
        lastText = '';

        autosize(input);

        InitEvent();
        ApplyText(obj.text);

        function InitEvent() {

            input.addEventListener('autosize:resized', ChangeHeightItem);
            buttonCancel.onclick = function(e) {
                console.log('buttonCancel');
                CancelEdit();
            }

            input.onfocus = function(e) {
                ItemClick(e);
                buttonSave.style.right = '75px';
                buttonCancel.style.right = '5px';
                autosize.update(input);
                ChangeHeightItem();
                console.log('onfocus');
            };

            input.onblur = function(e) {
                Unhighlight();
                ApplyText(input.value);
                buttonSave.style.right = '-75px';
                buttonCancel.style.right = '-145px';
                autosize.update(input);
                ChangeHeightItem();
                console.log('onblur');
            };
        }

        function ItemClick() {
            if(lastSelect != null)
                Unhighlight();
            lastSelect = item;
            Highlight();
            Edition();
        }

        function ChangeHeightItem() {
            containerItem.style.height = input.offsetHeight + 'px';
        }

        function ApplyText(text) {
            input.value = cutText(text);
            lastText = obj.text;
            obj.text = text;
        }

        function CancelEdit() {
            input.value = cutText(lastText);
            obj.text = lastText;
        }

        function GetText() {
            return obj.text;
        }

        function Highlight() {
            item.classList.add('excretionItem');
        }
        function Unhighlight() {
            item.classList.remove('excretionItem');
        }

        function Edition() {
            input.value = GetText();
        }

        function cutText(text) {
            let lineHeight;
            let words = text.split(' ');
            let textElement;

            CreateTextElement();
            let readyText = Cutter(text);
            textElement.remove();
            return readyText;

            function CreateTextElement() {
                let allStyleText = getComputedStyle(input);
                widthTextOriginal = Math.max(widthTextOriginal, input.offsetWidth - (parseInt(allStyleText.paddingLeft) + parseInt(allStyleText.paddingRight)));
                lineHeight = parseInt(allStyleText.lineHeight);
                textElement = document.createElement("p");

                textElement.style.lineHeight = lineHeight + 'px';
                textElement.style.fontSize = allStyleText.fontSize;
                textElement.style.fontFamily = allStyleText.fontFamily;
                textElement.style.display = 'inline-block';

                document.body.appendChild(textElement);
            }

            function Cutter(text) {
                if(getCountLines(text) > 3) {
                    let textFinally = '';
                    let lineText = '';

                    LinesPreparation();
                    LastLine();
                    CharactersPreparation();

                    function LinesPreparation() {
                        while (true) {
                            let tempText = textFinally + words[0] + ' ';
                            if(getCountLines(tempText) == 3) break;
                            words.shift();
                            textFinally = tempText;
                        }
                    }

                    function LastLine() {
                        while (true) {
                            lineText += words.shift() + ' ';
                            if(getCountLines(textFinally + lineText) == 4) break;
                        }
                    }

                    function CharactersPreparation() {
                        let characters = lineText.split('');
                        lineText = '';

                        for (let i = 0; i < characters.length; i++) {
                            let tempText = lineText + characters[i];

                            if(getWidthText(tempText) >= widthTextOriginal - 13) {
                                if(characters[i-1] == ' ') {
                                    lineChartTextSlice();
                                    if(characters[i-2] == '.') lineChartTextSlice();
                                }
                                if(characters[i-1] == '.') lineChartTextSlice();
                                break;
                            }
                            lineText = tempText;
                        }

                        function lineChartTextSlice() {
                            lineText = lineText.slice(0,-1);
                        }
                    }

                    return textFinally + lineText + '...';
                }
                return text;
            }

            function getCountLines(text) {
                SetText(text, true);
                var divHeight = textElement.offsetHeight;
                var lines = divHeight / lineHeight;
                return lines;
             }

             function getWidthText(text) {
                SetText(text, false);
                return textElement.offsetWidth;
             }

            function SetText(text, isFixedWidth) {
                textElement.innerText = text;
                textElement.style.width = isFixedWidth ? widthTextOriginal + 'px' : 'auto';
            }
        }
    }

    function ControlData() {
        let modelGeneral;
        this.data = {question: {text: ''}};

        this.Initialize = function(model) {
            modelGeneral = model;
            this.data = {
                question: JSON.parse(JSON.stringify(model.get('question'))),
                answers: JSON.parse(JSON.stringify(model.get('options'))),
                remove: []
            }
        }

        this.ApplyEdit = function() {
            modelGeneral.applyEdit(this.data);
        }

        this.addAnswer = function() {
            let newAnswer = {
                id: _.uniqueId('option-'),
                text: '',
                active: false
            };
            newAnswer.text = newAnswer.id;
            this.data.answers.push(newAnswer);
            return newAnswer;
        }

        this.removeAnswer = function(id) {
            this.data.answers = _.without(this.data.answers, _.find(this.data.answers, { id: id }));
            this.data.remove.push(id);
            // console.log(this.data);
        }
    }
}


window.appView = new app.AppView;
joint.setTheme('modern');