var app = app || {};
var qad = window.qad || {};

var commandManager;

InitQuestion();

function InitQuestion() {
    let headerHeight = 23;
    let bodyHeight = 71;
    let optionHeight = 50;
    let questionHeight = 212;
    let paddingBottom = 100;
    // let width = 235;

    joint.dia.Element.define('qad.Question', {
        ports: {
            groups: {
                'in': {
                    id: 'in',
                    position: {
                        name: 'left',
                        args: { x: '-3', y: '82'}
                    },
                    attrs: {
                        '.back': {
                            // magnet: 'passive',
                            pointerEvents: 'none',
                            fill: '#ffd6d6',
                            width: '24',
                            height: '24',
                            x: 22,
                            rx: 4,
                            ry: 4
                        },
                        '#port-in': {
                            // pointerEvents: 'none',
                            magnet: 'passive',
                            fill: 'transparent',
                            // x: -100,
                            width: '50',
                            height: '24'
                        },
                        '#highlight': {
                            display: 'none',
                            pointerEvents: 'none',
                            fill: '#FEB663',
                            width: '30',
                            height: '30',
                            y: -3,
                            x: 19,
                            rx: 7,
                            ry: 7
                        },
                        image: {
                            pointerEvents: 'none',
                        }
                    },
                    markup: '<rect id="port-in"/>',

                    label: {
                        markup: '<rect id="highlight" /><rect class="back"/><image width="14" height="10" style="transform: matrix(-1,0,0,1,42,7)" xlink:href="img/board/Union.svg"/>'
                    }
                },
                out: {
                    position: {
                        // name: 'right',
                        args: {x: 330 }
                    },
                    attrs: {
                        '.back': {
                            pointerEvents: 'all',
                            magnet: true,
                            fill: '#ffd6d6',
                            width: '24',
                            height: '24',
                            rx: 4,
                            ry: 4
                        },
                        '#connector': {
                            pointerEvents: 'none',
                            fill: 'transparent',
                            width: '75',
                            height: '24'
                        },
                        image: {
                            pointerEvents: 'none',
                        }
                    },
                    label: {
                        position: {
                            args: { x: 5, y: 3 }
                        },
                        markup: '<image width="14" height="10" xlink:href="img/board/Union.svg"/>'
                    },
                    markup: '<rect class="back"/><rect id="connector"/>'
                }
            },
            items: [{
                group: 'in'
            }]
        },
        attrs: {
            '.': {
                magnet: false
            },
            '#header-logo': {
                display: 'block',
            },
            '#header-logo rect': {
                fill: '#fff',
                width: 57,
                height: 50,
                rx: '6',
                ry: '6',
            },
            '#header-logo text': {
                fill: '#1CCF64',
                fontFamily: 'Nunito-Black',
                x: 12,
                y: 20,
                fontSize: 13,
            },
            '#header #number': {
                fill: '#998A8A',
                fontFamily: 'Nunito-Bold',
                x: 10,
                y: 48,
                fontSize: 12,
            },
            '#main-back': {
                fill: '#fff',
                refWidth: '100%',
                refHeight: '100%',
                y: 30,
                refHeight2: '-30',
                filter: 'url(#dropshadow)',
                rx: '7',
                ry: '7'
            },
            '#header #play': {
                event: 'element:play',
                refX: '50%',
                refX2: '-8',
                // x: 113,
                y: 40,
                width: 16,
                height: 19,
                cursor: 'pointer'
            },
            '#header #remove': {
                event: 'element:delete',
                refDx: -17,
                y: 38,
                width: 10,
                height: 9,
                cursor: 'pointer'
            },
            '#header #untitle': {
                x: 32,
                y: 88,
                fill: '#999999',
                fontFamily: 'Nunito-Regular',
                fontSize: 18,
                lineHeight: '24',
                letterSpacing: '-0.3'
            },
            '#header #question-title': {
                x: 32,
                y: 116,
                fontFamily: 'Nunito-SemiBold',
                fontSize: 18,
                lineHeight: 24,
                // letterSpacing: '-0.3'
            },
            '#header rect': {
                fill: '#F0E6E6',
                y: 146,
                refWidth: 1,
                height: 2,
            },
            '#body #title': {
                x: 32,
                y: 190,
                fill: '#999999',
                // fontFamily: 'Nunito-Regular',
                fontSize: 18,
                lineHeight: 24,
                // letterSpacing: '-0.3'
            },
            '#footer #edit rect': {
                event: 'element:edit',
                fill: '#1d85d0',
                refX: '50%',
                refX2: '-42%',
                refDy: '-80',
                rx: '6',
                ry: '6',
                refWidth: '84%',
                height: 48,
                cursor: 'pointer'
            },
            '#footer #edit text': {
                refX: '50%',
                refDy: '-50',
                fill: '#fff',
                textAnchor: 'middle',
                fontFamily: 'Nunito-Bold',
                fontSize: 18,
                pointerEvents: 'none',
                // letterSpacing: '-0.3'
            },
            text: {
                fontFamily: 'Nunito-Regular',
                letterSpacing: '-0.3'
            },
            // '.option': {
            //     refX: '50%',
            //     refX2: '-40%',
            //     refWidth: '80%',
            //     height: 50,
            //     cursor: 'pointer'
            // },
            '.option .subtitle': {
                fill: '#999999',
                fontSize: 12,
                x: 44,
                yAlignment: 'middle',
                fontFamily: 'Nunito-Bold',
            },
            '.option .title': {
                fontSize: 14,
                x: 44,
                yAlignment: 'middle',
                fontFamily: 'Nunito-Bold',
            },
            '.option rect': {
                refX: '50%',
                refX2: '-42%',
                refWidth: '84%',
                height: 52,
                rx: '6',
                ry: '6',
                fill: '#fff',
                strokeWidth: 1,
                stroke: '#F0E6E6'
            },
            '#outline':{
                display: 'none',
                fill: 'transparent',
                strokeWidth: 3,
                stroke: '#1d85d0',
                refWidth: '100%',
                refHeight: '100%',
                refWidth2: '20',
                refHeight2: '20',
                refX: '-10',
                refY: '-10',
                rx: '6',
                ry: '6',
                pointerEvents: 'none',
            }
        }
    }, {
        markup: [
            '<g id="header-logo">',
                '<rect/>',
                '<text id="start">Start</text>',
            '</g>',
            '<rect id="main-back"/>',

            '<g id="header">',
                '<text id="number">Node №1</text>',
                '<image id="play" xlink:href="img/board/Play.svg"/>',
                '<image id="remove" xlink:href="img/board/cross.svg"/>',
                '<text id="untitle"> Operator phrase: </text>',
                '<text id="question-title"/>',
                '<rect/>',
            '</g>',
            '<g id="body">',
                '<text id="title">Response:</text>',
            '</g>',
            '<g id="footer">',
                '<g id="edit">',
                    '<rect/>',
                    '<text>Click to edit</text>',
                '</g>',
            '</g>',
            '<g class="options"></g>',
            '<rect id="outline" />'
        ].join(''),

        optionMarkup: [
            '<g class="option">',
                '<rect/>',
                // '<image class="btn-remove-option" xlink:href="img/board/btn-remove.svg"/>',
                '<text class="subtitle"/>',
                '<text class="title"/>',
            '</g>'
        ].join(''),

        initialize: function() {
            // console.log(this.get('question'));
            joint.dia.Element.prototype.initialize.apply(this, arguments);
            this.on('change:options', this.onChangeOptions, this);
            this.on('change:question', this.onChangeQuestion, this);
            this.on('change:outline', this.onChangeOutline, this);
            this.on('change:number', this.onChangeNumber, this);

            this.on('change:questionHeight', function() {
                this.attr('.options/refY', questionHeight, { silent: true });
                // this.autoresize();
            }, this);

            // this.on('change:optionHeight', this.autoresize, this);

            this.attr('.options/refY', questionHeight, { silent: true });
            this.attr('#question-title/text', this.get('question').text, { silent: true });

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
            // console.log(this.getPorts()[0].attrs);
            let portIn = this.getPorts()[0];

            // console.log(portIn);
            if(portIn != null && portIn.group == 'in')
                if(portIn.attrs == null || portIn.attrs['.back'].fill != newColor)
                    this.portProp( portIn.id , 'attrs/.back/fill', newColor);
            // this.getPorts()[0].attrs.circle.fill = newColor;


            let questionText = joint.util.measureText(question.text);
            if(questionText != this.attr('#question-title/text'))
                this.attr('#question-title/text', questionText);
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

            _.each(options, function(option, index) {
                // console.log(option);

                var selector = '.option-' + option.id;
                // console.log(option);
                // console.log(index);
                attrsUpdate[selector] = { transform: 'translate(0, ' + offsetY + ')', dynamic: true };
                attrsUpdate[selector + ' rect'] = { height: optionHeight, dynamic: true };
                attrsUpdate[selector + ' .subtitle'] = { text: 'Option ' + (index + 1), dynamic: true, refY: 15 };
                attrsUpdate[selector + ' .title'] = { text: joint.util.measureText(option.text), dynamic: true, refY: 33 };

                offsetY += optionHeight;
                offsetY += 14;

                var portY = offsetY - optionHeight + questionHeight;
                // console.log(this.getPorts()[0]);
                if (!this.getPort(option.id)) {
                    // console.log("add");
                    this.addPort({ group: 'out', id: option.id, args: { y: portY }});
                } else {
                    // console.log("edit");
                    this.portProp(option.id, 'args/y', portY);
                    this.portProp(option.id, 'attrs/.back/fill', option.active ? '#FFF0BC' : '#ffd6d6');
                    this.portProp(option.id, 'attrs/.back/pointerEvents', option.active ? 'none' : 'all');
                }


            }.bind(this));
            this.attr(attrsUpdate);
            this.autoresize();
        },

        onChangeOutline: function() {
            let isOutline = this.get('outline');
            this.attr('#outline/display', isOutline ? 'block' : 'none' );
        },

        onChangeNumber: function() {
            let number = this.get('number');
            this.attr('#number/text', 'Node №' + number);
        },

        autoresize: function() {
            var options = this.get('options') || [];
            var height = options.length * optionHeight + ((options.length - 1) * 14) + questionHeight + paddingBottom;
            this.resize(400, height);
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
        },

        changeOutline : function(isOutline) {
            var outline = JSON.parse(JSON.stringify(this.get('outline')));
            outline = isOutline;
            this.set('outline', outline);
        },

        changeNumber : function(number) {
            var dataNumber = JSON.parse(JSON.stringify(this.get('number')));
            dataNumber = number;
            this.set('number', dataNumber);
        },

        applyOptionsAndQuestion : function(newOptions, newQuestion) {
            this.set('options', newOptions);
            this.set('question', newQuestion);
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
            // ports: {
            //     items: isStart ? [] : [{ group: 'in'}]
            // },
            attrs: {
                '#header-logo': {
                    display: isStart ? 'block' : 'none'
                },
                '#outline': {
                    refHeight2: isStart ? '20' : '-10',
                    refY: isStart ? '-10' : '20'
                }
            },
            position: { x: 400, y: 250 },
            // size: { width: 100, height: 70 },
            question: { text: text, active: false},
            start: isStart,
            outline: false,
            number: 1,
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
                    // x: 10,
                    fill: '#6a6c8a',
                    stroke: '#6a6c8a'
                },
                '.connection': {
                    stroke: '#6a6c8a',
                    strokeWidth: 2
                },
                '.marker-arrowheads': {
                    display: 'none'
                },
                '.tool-remove' : {
                    display: 'none'
                }
            }
        });
        // console.log(link);

        // link.set('router', {
        //     name: 'manhattan',
        //     args: {
        //         startDirections: ['top'],
        //         endDirections: ['bottom'],
        //         excludeTypes: ['myNamespace.MyCommentElement']
        //     }
        // });
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
    let dialogBlock = document.querySelector('.mode-start__block');
    let answers = document.querySelector('.mode-start__answer');
    let questionsText = document.querySelector('.mode-start__questions_text');
    let close = document.querySelector('.mode-start__header_close');

    this.Initialize = function() {
        close.onclick = dialog.onclick = closeDialog;
    }

    this.openDialog = function(graph, startID) {
        let dataJSON = app.Factory.createDialogJSON(graph, startID);
        // if(!ValidConnected()) return;
        ActivityDialog(true);
        RenderDialog(dataJSON);

        // function ValidConnected() {
        //     return dataJSON.nodes.length > 1 && dataJSON.links.length > 0;
        // }
    }

    function closeDialog() {
        ActivityDialog(false);
    }

    function ActivityDialog(isActive) {
        dialog.style.display = isActive ? 'block' : 'none';
        dialogBlock.style.display = isActive ? 'block' : 'none';
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
        let that = this;
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

        let paper = new joint.dia.Paper({
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
            // defaultLink:  function() {
            //     return new joint.shapes.mapping.Link();
            // },
            defaultLink: app.Factory.createLink(),
            defaultRouter: { name: 'manhattan', args: { padding: 10, maxAllowedDirectionChange: 180, perpendicular: false, startDirections: ['right'], endDirections: ['left'] , maximumLoops: 3000 }},
            // defaultRouter: { name: 'manhattan', args: { padding: 50 }},
            // connectionStrategy: joint.connectionStrategies.pinRelative,
            defaultConnectionPoint: {
                name: 'boundary',
                args: {
                    sticky: true,
                    // offset: -10
                }
            },
            defaultConnector: { name: 'rounded', args: { radius: 7} },
            validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                // Запретить связывание с входных портов.
                // return true;
                // console.log(magnetT);
                if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
                // Запретить связывание выходных портов с входными портами в одном элементе.
                if (cellViewS === cellViewT) return false;
                // Запретить связывание с входными портами.
                return (magnetT && magnetT.getAttribute('port-group') === 'in') ||
                        (cellViewS.model.get('type') === 'qad.Question' && cellViewT.model.get('type') === 'qad.Answer');
            },
            validateMagnet: function(cellView, magnet) {
                // Note that this is the default behaviour. Just showing it here for reference.
                // console.log(magnet);
                return magnet.getAttribute('magnet') !== 'passive';
            }
        });

        this.paper = paper;

        paper.off('cell:highlight')
        paper.on("cell:highlight", function(cellView, el) {
            el.parentNode.querySelector('#highlight').setAttribute('display', 'block');
        })
        paper.on("cell:unhighlight", function(cellView, el) {
            el.parentNode.querySelector('#highlight').setAttribute('display', 'none');
        })

        var paperScroller = new joint.ui.PaperScroller({
            autoResizePaper: true,
            padding: 1000,
            paper: paper,
            cursor: 'grab'
        });
        paperScroller.lock();
        paper.on('blank:pointerdown', paperScroller.startPanning);


        $('#app').append(paperScroller.render().el);
        paper.on('link:mouseenter', function(linkView) {
            this.removeTools();
            showLinkTools(linkView);
        })
        paper.on('blank:mousewheel', function(evt, x, y, delta) {
            evt.preventDefault();
            ZoomScroll(x, y, delta);
        })

        paper.on('cell:mousewheel', function(cellView, evt, x, y, delta) {
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

        paper.on('link:mouseleave', function() {
            this.removeTools();
        });


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

        function linkAction(mode, linkView) {
            commandManager.initBatchCommand();
            mode.remove();
            that.updatePort();
            commandManager.storeBatchCommand();
        }

        paper.defs.innerHTML = '<filter id="dropshadow"><feDropShadow dx="0" dy="8" stdDeviation="18" flood-color="#000000" flood-opacity="0.08"/></filter>';


        paper.on("link:snap:connect", function(linkView, evt) {
            evt.stopPropagation();
            // linkView.targetView.model.changeQuestionActivity(true);// attributes.ports.groups.in.attrs.circle.fill = '#FFF0BC';
            // linkView.sourceView.model.changeOptionActivity(linkView.sourceMagnet.getAttribute('port') , true);
            this.updatePort();
        }, this)
        paper.on("link:snap:disconnect", function(linkView, evt, elementViewDisconnected, magnet, arrowhead) {
            evt.stopPropagation();
            if(linkView.targetView == null) {
                this.updatePort();
                // elementViewDisconnected.model.changeQuestionActivity(false);//attributes.ports.groups.in.attrs.circle.fill = '#ffd6d6';
                // linkView.sourceView.model.changeOptionActivity(linkView.sourceMagnet.getAttribute('port') , false);
            }
        }, this)


        this.graph = paper.model;
        commandManager = new joint.dia.CommandManager({
            graph: this.graph,
        });

        $('.undo').click(function() { commandManager.undo(); });
        $('.redo').click(function() { commandManager.redo(); });

        paper.on('element:delete', function(elementView, evt, x, y) {
            evt.stopPropagation();
            let countQuestion = 0;
            // console.log(elementView);
            //o.target = cell.get('target');
            // linkView.sourceView.model.changeOptionActivity(linkView.sourceMagnet.getAttribute('port') , false);

            elementView.model.remove();
            _.each(this.graph.getCells(), function(cell) {
                if(cell.get('type') == 'qad.Question'){
                    countQuestion++;
                    cell.changeNumber(countQuestion);
                }
            });
            this.updatePort();
        }, this);

        paper.on('element:edit', function(elementView, evt, x, y) {
            evt.stopPropagation();
            editNodeWindow.SetListItems(elementView.model, this);
            // console.log(this);
            // this.updatePort();
        }, this);

        paper.on('element:play', function(elementView, evt, x, y) {
            evt.stopPropagation();
            modePlay.openDialog(this.graph, elementView.model.id);
        }, this);


    },

    updatePort: function() {
        let paper = this.paper;
        let dataFilter = {
            models: [],
            in: [],
            out: []
        }
        _.each(this.graph.getCells(), function(cell) {
            if(cell.get('type') == 'qad.Question'){
                dataFilter.models.push(cell);
            }
            else {
                let linkView = paper.findViewByModel(cell);
                if(linkView.targetMagnet != null) {
                    dataFilter.in.push(linkView.targetMagnet.getAttribute('port'));
                    dataFilter.out.push(linkView.sourceMagnet.getAttribute('port'));
                }
            }
        });
        _.each(dataFilter.models, function(model) {
            let options = model.get('options');
            let question = model.get('question');

            // if(!model.get('start')) {
            let mainPortID = model.getPorts()[0].id;
            question.active = dataFilter.in.includes(mainPortID);
            // }
            _.each(options, function(opt) {
                opt.active = dataFilter.out.includes(opt.id);
            });
            model.applyOptionsAndQuestion(options, question);
            model.onChangeOptions();
            model.onChangeQuestion();
        });
    },

    addQuestion: function() {
        let countQuestion = 0;
        let isStart = true;

        _.each(this.graph.getCells(), function(model) {
            if(model.get('start')) {
                isStart = false;
                return false;
            }
        }.bind(this));
        app.Factory.createQuestion('Question', isStart).addTo(this.graph);

        _.each(this.graph.getCells(), function(cell) {
            if(cell.get('type') == 'qad.Question'){
                countQuestion++;
                cell.changeNumber(countQuestion);
            }
        });
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

    if(lineWidth > 220) {
        let characters = text.split('');
        let newText = '';
        for (let i = 0; i < characters.length; i++) {
            newText += characters[i];
            textNode.data = newText;
            lineWidth = textSpan.getBBox().width;
            if(lineWidth >= 220) {
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
    let modelGeneral;
    let cloneItemMain;
    let countItems;
    let lastSelect;
    let widthTextOriginal = 0;
    let nodeEdit = document.querySelector('.node-edit');
    let nodeEditBlock = document.querySelector('.node-edit__block');
    let containerItem = nodeEditBlock.querySelector('.node-edit__wrapper-item');
    let сloseButton = nodeEditBlock.querySelector('.node-edit__header_btn');
    let saveButton = nodeEditBlock.querySelector('.node-edit__save');
    let playButton = nodeEditBlock.querySelector('.node-edit__play');
    // let body = document.querySelector('body');
    let questionItem;

    let controlData = new ControlData();
    // let textEditor = new TextEditor();

    this.Initialize = function() {
        CloneItem();
        AddButton();
        QuestionItem();
        CloseWindowButton();
        PlayButton();

        function CloneItem() {
            let itemOriginal = containerItem.querySelector('.node-edit__inner-item');
            cloneItemMain = itemOriginal.cloneNode(true);
            Reset();
        }

        function AddButton() {
            let addButton = nodeEditBlock.querySelector('.node-edit__add-item');
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
            сloseButton.onclick = saveButton.onclick = nodeEdit.onclick = function() {
                controlData.ApplyEdit();
                ShowWindow(false);
            }
        }

        function PlayButton() {
            playButton.onclick = function() {
                console.log('play');
                modePlay.openDialog(modelGeneral.graph, modelGeneral.id);
            }
        }
    }

    this.SetListItems = function(model, updatePort) {
        controlData.Initialize(model, updatePort);
        modelGeneral = model;
        console.log(modelGeneral);
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
        // CheckOutVisual();

        function InitEvent() {
            cloneItem.querySelector('.node-edit__remove-item')
            .onclick = function (e) {
                e.stopPropagation();
                countItems--;
                this.parentNode.remove();
                // CheckOutVisual();
                controlData.removeAnswer(obj.id);
            };
        }

        // function CheckOutVisual() {
        //     if (countItems >= 3) containerItem.classList.add('activeScroll');
        //     else containerItem.classList.remove('activeScroll');
        // }
    }

    function ShowWindow(isShow) {
        modelGeneral.changeOutline(isShow);
        nodeEditBlock.style.transform = 'translateX(' + (isShow ? 0 : 764) + 'px)';
        nodeEdit.style.display = (isShow ? 'block' : 'none');
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

            input.addEventListener('autosize:resized', function() {
                ChangeHeightItem();
            });
            buttonCancel.onclick = function(e) {
                console.log('buttonCancel');
                CancelEdit();
            }

            input.onfocus = function(e) {
                ItemClick(e);
                buttonSave.style.right = '75px';
                buttonCancel.style.right = '5px';
                input.style.paddingBottom = '35px';
                autosize.update(input);
                ChangeHeightItem();
                console.log('onfocus');
            };

            input.onblur = function(e) {
                Unhighlight();
                ApplyText(input.value);
                buttonSave.style.right = '-75px';
                buttonCancel.style.right = '-145px';
                input.style.paddingBottom = '10px';
                autosize.update(input);
                ChangeHeightItem(52);
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

        function ChangeHeightItem(newHeight) {
            // input.style.paddingBottom = indent;
            containerItem.style.height = (newHeight || input.offsetHeight) + 'px';
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
                if(getCountLines(text) > 1) {
                    let textFinally = '';
                    let lineText = '';

                    LinesPreparation();
                    LastLine();
                    CharactersPreparation();

                    function LinesPreparation() {
                        while (true) {
                            let tempText = textFinally + words[0] + ' ';
                            if(getCountLines(tempText) == 1) break;
                            words.shift();
                            textFinally = tempText;
                        }
                    }

                    function LastLine() {
                        while (true) {
                            lineText += words.shift() + ' ';
                            if(getCountLines(textFinally + lineText) == 2) break;
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
        this.data = {question: {text: ''}};
        let app;

        this.Initialize = function(model, updatePort) {
            this.data = {
                question: JSON.parse(JSON.stringify(model.get('question'))),
                answers: JSON.parse(JSON.stringify(model.get('options'))),
                remove: []
            }
            app = updatePort;
        }

        this.ApplyEdit = function() {
            modelGeneral.applyEdit(this.data);
            app.updatePort();
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