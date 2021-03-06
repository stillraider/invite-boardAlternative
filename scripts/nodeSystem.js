var app = app || {};
var qad = window.qad || {};

var commandManager;

InitQuestion();

function InitQuestion() {
    // let headerHeight = 23;
    // let bodyHeight = 71;
    let optionHeight = 50;
    let questionHeight = 170;
    let paddingBottom = 100;
    // let width = 235;

    joint.dia.Element.define('qad.Question', {
        ports: {
            groups: {
                'in': {
                    id: 'in',
                    position: {
                        name: 'left',
                        args: { x: '-3', y: '62'}
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
            // '#header-logo': {
            //     display: 'block',
            // },
            // '#header-logo rect': {
            //     fill: '#fff',
            //     width: 57,
            //     height: 50,
            //     rx: '6',
            //     ry: '6',
            // },
            // '#header-start': {
            //     display: 'block',
            //     fill: '#1CCF64',
            //     fontFamily: 'Nunito-Black',
            //     x: 32,
            //     y: 40,
            //     fontSize: 13,
            // },
            '#header-strat': {
                display: 'block',
            },
            '#header-strat #startBorder': {
                width: 38,
                height: 20,
                rx: '6',
                ry: '6',
                x: 32,
                y: 7,

                fill: 'transparent',
                strokeWidth: 1,
                stroke: '#1CCF64',
            },
            '#header-strat #start': {
                fill: '#1CCF64',
                fontFamily: 'Nunito-Black',
                x: 36,
                y: 21,
                fontSize: 12,
            },
            '#header-end': {
                display: 'none',
            },
            '#header-end #endBorder': {
                width: 38,
                height: 20,
                rx: '6',
                ry: '6',
                x: 32,
                y: 7,

                fill: 'transparent',
                strokeWidth: 1,
                stroke: 'black',
            },
            '#header-end #end': {
                fill: 'black',
                fontFamily: 'Nunito-Black',
                x: 40,
                y: 21,
                fontSize: 12,
            },
            // '#header-control': {
            //     display: 'none',
            // },
            '#header-control #back': {
                width: 81,
                height: 117,
                fill: 'transparent',
                x: 400,
                y: 0,
            },
            '#header-control #startNode': {
                event: 'element:setStart',
                transform: 'translate(420, 0)',
                cursor: 'pointer'
            },
            '#header-control #startNode text': {
                // cursor: 'pointer',
                fill: 'black',
                fontFamily: 'Nunito-Black',
                x: 6.5,
                y: 24,
                fontSize: 19,
            },
            '#header-control #startNode rect': {
                // cursor: 'pointer',
                width: 61,
                height: 35,
                rx: '6',
                ry: '6',
                // x: 420,
                y: 0,

                fill: 'transparent',
                strokeWidth: 1,
                stroke: 'black',
            },
            '#header-control #endNode': {
                event: 'element:setEnd',
                transform: 'translate(420, 40)',
                cursor: 'pointer'
            },
            '#header-control #endNode text': {
                fill: 'black',
                fontFamily: 'Nunito-Black',
                x: 13,
                y: 24,
                fontSize: 19,
            },
            '#header-control #endNode rect': {
                width: 61,
                height: 35,
                rx: '6',
                ry: '6',
                // x: 420,
                // y: 40,

                fill: 'transparent',
                strokeWidth: 1,
                stroke: 'black',
            },
            '#header-control #add': {
                event: 'element:add',
                transform: 'translate(420, 81)',
                cursor: 'pointer'
            },
            '#header-control #add rect': {
                width: 61,
                height: 35,
                // x: 420,
                // y: 81,

                fill: 'transparent',
                strokeWidth: 1,
                stroke: 'black',
                rx: '6',
                ry: '6',
            },
            '#header-control #add text': {
                fill: 'black',
                fontFamily: 'Nunito-Black',
                x: 7,
                y: 24,
                fontSize: 19,
            },
            '#header #number': {
                display: 'none',
                fill: '#998A8A',
                fontFamily: 'Nunito-Bold',
                x: 10,
                y: 48,
                fontSize: 12,
            },
            '#main-back': {
                // event: 'element:border',
                fill: '#fff',
                refWidth: '100%',
                refHeight: '100%',
                // y: 30,
                // refHeight2: '-30',
                filter: 'url(#dropshadow)',
                rx: '7',
                ry: '7'
            },
            '#header #play': {
                event: 'element:play',
                refX: '50%',
                refX2: '-8',
                // x: 113,
                y: 7,
                width: 16,
                height: 19,
                cursor: 'pointer'
            },
            '#header #remove': {
                event: 'element:delete',
                refDx: -17,
                y: 7,
                x: -32,
                width: 16,
                height: 16,
                cursor: 'pointer'
            },
            '#header #untitle': {
                x: 32,
                y: 53,
                fill: '#999999',
                fontFamily: 'Nunito-Regular',
                fontSize: 18,
                lineHeight: '24',
                letterSpacing: '-0.3'
            },
            '#header #question-title': {
                x: 32,
                y: 80,
                fontFamily: 'Nunito-SemiBold',
                fontSize: 18,
                lineHeight: 24,
                // letterSpacing: '-0.3'
            },
            '#header #border-bottom': {
                fill: '#F0E6E6',
                y: 107,
                refWidth: 1,
                height: 2,
            },
            '#body #title': {
                x: 32,
                y: 150,
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
            '.option .back': {
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
            '.option .add': {
                transform: 'translate(303, 14)'
            },
            '.option .add rect': {
                event: 'element:addFromOut',
                cursor: 'pointer',
                fill: '#BED2A6',
                width: '24',
                height: '24',
                rx: 4,
                ry: 4
            },
            '.option .add image': {
                x: 6,
                y: 6,
                pointerEvents: 'none'
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
            },
            '#outlineВotted': {
                display: 'none',
            },
            '#outlineВotted #botted': {
                fill: 'transparent',
                strokeWidth: 3,
                stroke: '#1d85d0',
                strokeDasharray: '5',
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
            // '<g id="header-logo">',
                // '<rect/>',
                // '<text id="header-start">Start</text>',
            // '</g>',
            '<g id="outlineВotted">',
                '<rect id="botted"/>',
                '<g id="header-control">',
                    '<rect id="back" />',
                    '<g id="startNode">',
                        '<rect/>',
                        '<text>Start</text>',
                    '</g>',
                    '<g id="endNode">',
                        '<rect/>',
                        '<text>End</text>',
                    '</g>',
                    '<g id="add">',
                        '<rect/>',
                        '<text>Node</text>',
                    '</g>',
                '</g>',
            '</g>',

            '<rect id="main-back"/>',
            '<g id="header">',
                '<g id="header-strat">',
                    '<rect id="startBorder" />',
                    '<text id="start">Start</text>',
                '</g>',
                '<g id="header-end">',
                    '<rect id="endBorder" />',
                    '<text id="end">End</text>',
                '</g>',
                '<text id="number">Node №1</text>',
                '<image id="play" xlink:href="img/board/Play.svg"/>',
                '<image id="remove" xlink:href="img/board/cross.svg"/>',
                '<text id="untitle"> Operator phrase: </text>',
                '<text id="question-title"/>',
                '<rect id="border-bottom"/>',
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
            '<rect id="outline" />',
        ].join(''),

        optionMarkup: [
            '<g class="option">',
                '<rect class="back"/>',
                // '<image class="btn-remove-option" xlink:href="img/board/btn-remove.svg"/>',
                '<text class="subtitle"/>',
                '<text class="title"/>',
                '<g class="add">',
                    '<rect/>',
                    '<image width="12" height="12" xlink:href="img/board/arrowAdd.svg"/>',
                '</g>',
            '</g>'
        ].join(''),

        initialize: function() {
            // console.log(this.get('question'));
            joint.dia.Element.prototype.initialize.apply(this, arguments);
            this.on('change:options', this.onChangeOptions, this);
            this.on('change:question', this.onChangeQuestion, this);
            this.on('change:outline', this.onChangeOutline, this);
            this.on('change:outlineВotted', this.onChangeOutlineВotted, this);
            this.on('change:number', this.onChangeNumber, this);
            this.on('change:startEnd', this.onChangeStartEnd, this);

            this.on('change:questionHeight', function() {
                this.attr('.options/refY', questionHeight, { silent: true });
                // this.autoresize();
            }, this);

            // this.on('change:optionHeight', this.autoresize, this);

            this.attr('.options/refY', questionHeight, { silent: true });
            this.attr('#question-title/text', joint.util.measureText(this.get('question').text), { silent: true });

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
                attrsUpdate[selector + ' .back'] = { height: optionHeight, dynamic: true };
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

        onChangeOutlineВotted: function() {
            let isOutlineВotted = this.get('outlineВotted');
            this.attr('#outlineВotted/display', isOutlineВotted ? 'block' : 'none' );
        },

        onChangeNumber: function() {
            let number = this.get('number');
            this.attr('#number/text', 'Node №' + number);
        },

        onChangeStartEnd: function() {
            let that = this;
            let startEnd = this.get('startEnd');
            if(startEnd == null) setDisplay('none', 'none');
            else setDisplay(startEnd ? 'block' : 'none', startEnd ? 'none' : 'block');

            function setDisplay(start, end) {
                that.attr('#header-strat/display', start);
                that.attr('#header-end/display', end);
            }
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
            this.set('comments', obj.comments);

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

        changeOutlineВotted : function(isOutlineВotted) {
            var outlineВotted = JSON.parse(JSON.stringify(this.get('outlineВotted')));
            outlineВotted = isOutlineВotted;
            this.set('outlineВotted', outlineВotted);
        },

        changeNumber : function(number) {
            var dataNumber = JSON.parse(JSON.stringify(this.get('number')));
            dataNumber = number;
            this.set('number', dataNumber);
        },

        changeStartEnd : function(isStart) {
            // var dataNumber = JSON.parse(JSON.stringify(this.get('number')));
            // dataNumber = number;
            this.set('startEnd', isStart);
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
    createQuestion: function(text, isStart, x, y) {
        let question = new joint.shapes.qad.Question({
            // ports: {
            //     items: isStart ? [] : [{ group: 'in'}]
            // },
            attrs: {
                '#header-strat': {
                    display: isStart ? 'block' : 'none'
                },
                // '#outline': {
                //     refHeight2: isStart ? '20' : '-10',
                //     refY: isStart ? '-10' : '20'
                // },
                // '#outlineВotted #botted': {
                //     refHeight2: isStart ? '20' : '-10',
                //     refY: isStart ? '-10' : '20'
                // }
            },
            position: { x: x || 400, y: y || 250 },
            // size: { width: 100, height: 70 },
            question: { text: text, active: false},
            startEnd: isStart ? true : null,
            outline: false,
            outlineВotted: false,
            number: 1,
            // inPorts: [{ id: 'in', label: 'In' }],
            options: [
                // { id: 'yes', text: 'Yes', active: false },
                // { id: 'no', text: 'No', active: false }
            ],
            comments: null
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
                        if(cell.get('startEnd'))
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
    let answers = dialogBlock.querySelector('.mode-start__answer');
    let questionsText = dialogBlock.querySelector('.mode-start__questions_text');
    let close = dialogBlock.querySelector('.mode-start__header_close');
    let openEdit = dialogBlock.querySelector('.mode-start__header_open-edit');
    let modelGeneral;
    let appView;

    this.Initialize = function() {
        close.onclick = dialog.onclick = closeDialog;
        openEdit.onclick = function() {
            closeDialog();
            OpenEdit();
        }
    }

    this.openDialog = function(model, appV) {//graph, startID) {
        modelGeneral = model;
        appView = appV;
        let dataJSON = app.Factory.createDialogJSON(appView.graph, model.id);
        // if(!ValidConnected()) return;
        ActivityDialog(true);
        RenderDialog(dataJSON);


        // function ValidConnected() {
        //     return dataJSON.nodes.length > 1 && dataJSON.links.length > 0;
        // }
    }

    function OpenEdit() {
        editNodeWindow.SetListItems(modelGeneral, appView);
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
        answers.innerHTML = '';
        for (var i = 0; i < node.options.length; i++) {
            answers.appendChild(RenderOption(node.options[i]));
        }
        questionsText.innerHTML = node.question.text;
    };

    function RenderOption(option) {
        var elOption = CreateElement('div', 'mode-start__answer_item');
        elOption.innerHTML = option.text;
        let optionID = option.id;

        if (elOption.textContent.length > 40) {
            elOption.style.width = '100%';
        }

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
        'click .board__create-node': function() {
            this.addQuestion();
        },
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
        let prevModelOutlineВotted;
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

        paper.on('cell:pointerclick', function(ellView, evt, x, y) {
            evt.preventDefault();
            if(prevModelOutlineВotted != null)
                prevModelOutlineВotted.changeOutlineВotted(false);
            prevModelOutlineВotted = ellView.model;
            ellView.model.changeOutlineВotted(true);
            // console.log(ellView);
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
            this.updatePort();
        }, this)
        paper.on("link:snap:disconnect", function(linkView, evt, elementViewDisconnected, magnet, arrowhead) {
            evt.stopPropagation();
            if(linkView.targetView == null)
                this.updatePort();
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
            if(prevModelOutlineВotted != null)
                prevModelOutlineВotted.changeOutlineВotted(false);
            editNodeWindow.SetListItems(elementView.model, this);
        }, this);

        paper.on('element:addFromOut', function(elementView, evt, x, y) {
            evt.stopPropagation();
            let link = app.Factory.createLink();
            let pos = elementView.model.get('position');
            let question = this.addQuestion(pos.x + 530, pos.y);
            link.addTo(this.graph);
            link.source({id: elementView.model.get('id'), port: evt.target.parentNode.parentNode.getAttribute('option-id')});
            link.target({id: question.get('id'), port: question.getPorts()[0].id});
            this.updatePort();
            // console.log(this.graph.getCells());
            // console.log(evt);
        }, this);

        paper.on('element:play', function(elementView, evt, x, y) {
            evt.stopPropagation();
            modePlay.openDialog(elementView.model, this);
        }, this);

        paper.on('element:setStart', function(elementView, evt, x, y) {
            evt.stopPropagation();
            let oldStart = this.findModelStart();

            if(!oldStart || oldStart.id != elementView.model.id)
                elementView.model.changeStartEnd(true);
            if(oldStart) oldStart.changeStartEnd(null);
        }, this);
        paper.on('element:setEnd', function(elementView, evt, x, y) {
            evt.stopPropagation();

            if(elementView.model.get('startEnd') != false)
                elementView.model.changeStartEnd(false);
            else
                elementView.model.changeStartEnd(null);
        }, this);
        paper.on('element:add', function(elementView, evt, x, y) {
            evt.stopPropagation();
            let pos = elementView.model.get('position');
            this.addQuestion(pos.x + 530, pos.y);
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

    addQuestion: function(x, y) {
        let countQuestion = 0;
        let isStart = this.findModelStart() == null;
        let question = app.Factory.createQuestion('<p>Empty</p>', isStart, x, y);

        question.addTo(this.graph);

        _.each(this.graph.getCells(), function(cell) {
            if(cell.get('type') == 'qad.Question'){
                countQuestion++;
                cell.changeNumber(countQuestion);
            }
        });

        return question;
    },

    findModelStart: function() {
        let model = null;
        _.each(this.graph.getCells(), function(cell) {
            if(cell.get('startEnd')) {
                model = cell;
                return false;
            }
        }.bind(this));
        return model;
    },

    previewDialog: function() {
        modePlay.openDialog(null, this);
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
    let mathes = [...text.matchAll(/<(?:p|li)>(.*?)<\/(?:p|li)>/g)];
    text = mathes[0][1].replace(/<.*?>/g, "");
    var svgDocument = V('svg').node;
    var textElement = V('<text><tspan></tspan></text>').node;
    var textSpan = textElement.firstChild;
    var textNode = document.createTextNode('');

    textSpan.appendChild(textNode);
    svgDocument.appendChild(textElement);
    document.body.appendChild(svgDocument);


    textNode.data = text;
    var lineWidth = textSpan.getBBox().width;

    let newText = text;

    if(lineWidth > 200) {
        let characters = text.split('');
        newText = '';
        for (let i = 0; i < characters.length; i++) {
            newText += characters[i];
            textNode.data = newText;
            lineWidth = textSpan.getBBox().width;
            if(lineWidth >= 200) {
                newText += '...';
                break;
            }
        }
    }
    else if(mathes.length > 1)
        newText += '...';

    V(svgDocument).remove();
    return newText;
};

let editNodeWindow = new EditNodeWindow();
editNodeWindow.Initialize();

function EditNodeWindow() {
    let modelGeneral;
    let cloneItemMain;
    let lastSelect;
    let widthTextOriginal = 0;
    let nodeEdit = document.querySelector('.node-edit');
    let nodeEditBlock = document.querySelector('.node-edit__block');
    let containerItem = nodeEditBlock.querySelector('.node-edit__wrapper-item');
    let сloseButton = nodeEditBlock.querySelector('.node-edit__header_btn');
    let saveButton = nodeEditBlock.querySelector('.node-edit__save');
    let playButton = nodeEditBlock.querySelector('.node-edit__play');

    let questionItem;
    let app;

    let controlData = new ControlData();
    let commentEditNode = new CommentEditNode();

    this.Initialize = function() {
        CloneItem();
        AddButton();
        QuestionItem();
        CloseWindowButton();
        PlayButton();
        commentEditNode.Initialize();

        function CloneItem() {
            let itemOriginal = containerItem.querySelector('.node-edit__inner-item');

            cloneItemMain = itemOriginal.cloneNode(true);
            Reset();
        }

        function AddButton() {
            InitButton('.node-edit__add-item');
            InitButton('.node-edit__add-next', 'Next');

            function InitButton(className, text) {
                let addButton = nodeEditBlock.querySelector(className);
                // console.log(addButton);
                addButton.onclick = function() {
                    let answer = controlData.addAnswer(text);
                    AddItem(answer);
                }
            }
        }

        function QuestionItem() {
            questionItem = nodeEditBlock.querySelector('.node-edit__operator')
                                .querySelector('.node-edit__inner-item');
        }

        function CloseWindowButton() {
            сloseButton.onclick = nodeEdit.onclick = function() {
                controlData.ApplyEdit();
                ShowWindow(false);
            }

            saveButton.onclick = function () {
                controlData.ApplyEdit();
            }
        }

        function PlayButton() {
            playButton.onclick = function() {
                controlData.ApplyEdit();
                modePlay.openDialog(modelGeneral, app);
            }
        }
    }

    this.SetListItems = function(model, appView) {
        modelGeneral = model;
        app = appView;
        controlData.Initialize();
        commentEditNode.UpdateEvents();
        // console.log(modelGeneral);
        Reset();
        GenerateItems();
        ShowWindow(true);

        InitEditItem(questionItem, controlData.data.question);
        FocusInput();
        function GenerateItems() {
            _.each(controlData.data.answers, function(answer) {
                AddItem(answer);
            }.bind(this));
        }
    }

    function FocusInput() {
        let editors = document.querySelectorAll('#editor');
        if(editors.length == 1) {
            let quill = Quill.find(editors[0]);


            setTimeout(() => {
                quill.focus();
                setTimeout(() => {
                    quill.setSelection(quill.getLength(), 0);
                }, 0)
            }, 0)
            // quill.setSelection(0, 1, "user");
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
        editor = containerItem.querySelector('#editor'),
        quill = Quill.find(editor) || new Quill(editor, { //TODO: Узнать удаляеться ли объект с кучи после удаления елемента
            theme: 'snow'
        });
        let input = containerItem.querySelector('.ql-editor'),
        // textInput = input.querySelector('p'),
        buttonSave = containerItem.querySelector('.node-edit__control_start'),
        buttonCancel = containerItem.querySelector('.node-edit__control_cancel'),
        qlToolbar = containerItem.querySelector('.ql-toolbar'),
        lastText = '';

        autosize(input);

        InitEvent();
        ApplyText(obj.text);

        function InitEvent() {
            buttonCancel.onclick = function(e) {
                // console.log('buttonCancel');
                DisableEdit();
                CancelEdit();
            }

            buttonSave.onclick = function(e) {
                // console.log('buttonSave');
                DisableEdit();
            }

            input.onfocus = InputClick;

            function InputClick(e) {
                input.onfocus = null;
                document.addEventListener('mousedown', documentClick);

                qlToolbar.style.top = 0;

                ItemClick(e);
                buttonSave.style.right = '75px';
                buttonCancel.style.right = '5px';
                ShowParameters();
                // console.log('onfocus');
                input.innerHTML = obj.text;
                quill.on('text-change', ShowParameters);
            }

            function ShowParameters() {
                ChangeHeightItem(null, 35, 50);
            }

            function documentClick(event) {
                // console.log("documentClick");
                let isClickInside = containerItem.contains(event.target);

                if (!isClickInside) {
                    DisableEdit();
                }
            }

            function DisableEdit() {
                quill.off('text-change', ShowParameters);
                input.onfocus = InputClick;
                document.removeEventListener('mousedown', documentClick);

                qlToolbar.style.top = '-48px';
                Unhighlight();
                ApplyText(input.innerHTML);
                buttonSave.style.right = '-75px';
                buttonCancel.style.right = '-145px';
                // autosize.update(input);
                ChangeHeightItem(52, 10, 24);
            }
        }

        function ItemClick() {
            if(lastSelect != null)
                Unhighlight();
            lastSelect = item;
            Highlight();
            Edition();
        }

        function ChangeHeightItem(newHeight, paddingBottom, paddingTop) {
            input.style.paddingBottom = paddingBottom + 'px';
            input.style.paddingTop = paddingTop + 'px';

            if(!newHeight) {
                newHeight = paddingBottom + paddingTop;
                _.each(input.children, function(child) {
                    newHeight += child.offsetHeight;
                }.bind(this));
            }
            containerItem.style.height = newHeight + 'px';
        }

        function ApplyText(text) {
            input.innerHTML = cutText(text);
            lastText = obj.text;
            obj.text = text;
        }

        function CancelEdit() {
            input.innerHTML = cutText(lastText);
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
            // console.log(text);
            let mathes = [...text.matchAll(/<(?:p|li)>(.*?)<\/(?:p|li)>/g)];
            // console.log(mathes);
            text = mathes[0][1].replace(/<.*?>/g, "");
            let lineHeight;

            let textElement;

            CreateTextElement();
            let readyText = Cutter();
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

            function Cutter() {
                // let linesUser = text.split('\n')[0];
                // if(getCountLines(linesUser) > 1)
                //     text = linesUser;
                // else return linesUser;
                let words = text.split(' ');
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
                return text + (mathes.length > 1 ? '...' : '');
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


        this.Initialize = function() {
            this.data = {
                question: JSON.parse(JSON.stringify(modelGeneral.get('question'))),
                answers: JSON.parse(JSON.stringify(modelGeneral.get('options'))),
                comments: '',
                remove: []
            }
        }

        this.ApplyEdit = function() {
            this.data.comments = commentEditNode.GetTextHTML();
            modelGeneral.applyEdit(this.data);
            app.updatePort();
        }

        this.addAnswer = function(text) {
            let newAnswer = {
                id: _.uniqueId('option-'),
                text: '',
                active: false
            };
            newAnswer.text = '<p>' + (text || newAnswer.id) + '</p>';

            this.data.answers.push(newAnswer);
            return newAnswer;
        }

        this.removeAnswer = function(id) {
            this.data.answers = _.without(this.data.answers, _.find(this.data.answers, { id: id }));
            this.data.remove.push(id);
        }
    }

    function CommentEditNode() {
        let markupItem = [
            '<div class="comment__item">',
                '<div class="comment__item_img"></div>',
                '<div class="comment__item_inner">',
                    '<div class="comment__item_info">',
                        '<p class="comment__item_name">Jane Cooper</p>',
                        '<p class="comment__item_time">15 feb at 14:30</p>',
                    '</div>',
                    '<div class="comment__wrap-text">',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');

        let markupComment = [
            '<div class="comment__item_text">',
                '<input type="text" class="comment__text-edit" autocomplete="off">',
                '<p class="comment__user_text">Hey Marvin, please chang the call guidance instructions according to the new rules.</p>',
                '<span class="comment__item_edit"></span>',
                '<span class="comment__item_del"></span>',
            '</div>'
        ].join('');

        let comment = document.querySelector('.comment');
        let commentText = comment.querySelector('.comment__text');
        let addComment = comment.querySelector('.comment__add-comment');
        let commentsContainer = nodeEditBlock.querySelector('.comment__wrap-item');
        let prevCommentEdit;

        this.Initialize = function() {
            InitInputMessage();

            addComment.onclick = function () {
                if (commentText.value.length < 1) {
                    commentText.focus();
                    return;
                }
                if(commentsContainer.children.length == 1) {
                    CloneComment();
                }
                AddCommentUser();
            };
        }

        this.UpdateEvents = function() {
            ApplyComments();
            ApplyFindItems();

            function ApplyComments() {
                let comments = modelGeneral.get('comments');

                if(!comments) {
                    commentsContainer.innerHTML = markupItem;
                    commentsContainer.querySelector('.comment__wrap-text').innerHTML = markupComment;
                    return;
                }

                commentsContainer.innerHTML = comments;
            }

            function ApplyFindItems() {
                let itemTexts = commentsContainer.querySelectorAll('.comment__item_text');

                for (let i = 0; i < itemTexts.length; i++)
                    InitClickOnEdit(itemTexts[i]);
            }
        }

        this.GetTextHTML = function() {
            return commentsContainer.innerHTML;
        }

        function InitInputMessage() {
            commentText.onclick = function () {
                ActiveButton('30px', '54px');
                document.addEventListener('click', DocumentClick);
            }

            function DocumentClick(event) {
                let isClickInside = commentText.parentNode.contains(event.target);

                if (!isClickInside) {
                    ActiveButton('-120px', '0');
                }
            }

            function ActiveButton(rightNew, marginNew) {
                addComment.style.right = rightNew;
                commentText.style.marginBottom = marginNew;
                document.removeEventListener('click', DocumentClick);
            }
        }

        function CloneComment() {
            commentsContainer.appendChild(document.createRange().createContextualFragment(markupItem));
            let cloned = commentsContainer.lastChild;

            cloned.querySelector('.comment__item_img').style.background = 'url(img/board/Ellipse-2.png) center/cover no-repeat';
            cloned.querySelector('.comment__item_name').innerHTML = 'Marvin Cooper';
        }

        function AddCommentUser() {
            let wrapText = commentsContainer.lastChild.querySelector('.comment__wrap-text');
            wrapText.appendChild(document.createRange().createContextualFragment(markupComment));
            let clonedText = wrapText.lastChild;


            clonedText.querySelector('.comment__user_text').innerHTML = commentText.value;

            InitClickOnEdit(clonedText);
            CommentRemoveItem();
            ClearInputComment();
        }

        function ClearInputComment() {
            commentText.value = '';
            commentText.style.height = '52px';
            commentText.focus();
            nodeEditBlock.scrollTop = nodeEditBlock.scrollHeight;
        }

        function InitClickOnEdit(item) {
            let userText = item.querySelector('.comment__user_text');
            let textEdit = item.querySelector('.comment__text-edit');
            let edit = item.querySelector('.comment__item_edit');
            let isShowEditor = false;
            console.log(edit);

            edit.onclick = function () {
                if (prevCommentEdit == edit) {
                    prevCommentEdit = null;
                }else if (prevCommentEdit != null) {
                    prevCommentEdit.onclick();
                    prevCommentEdit = edit;
                }else if (prevCommentEdit == null) {
                    prevCommentEdit = edit;
                }
                isShowEditor = !isShowEditor;
                edit.classList.toggle('switcherIconApply');

                if (isShowEditor) {
                    SwitchVisivbleEdit('block');
                    textEdit.value = userText.innerText;
                    textEdit.focus();
                }else {
                    SwitchVisivbleEdit('none');
                    userText.innerText = textEdit.value;
                }

                function SwitchVisivbleEdit(infoDisplay) {
                    textEdit.style.display = infoDisplay;
                }
            }
        }
    }

    function CommentRemoveItem() {
        let itemDel = document.querySelectorAll('.comment__item_del');

        for (let i = 0; i < itemDel.length; i++) {
            let item = itemDel[i];
            let itemText = item.closest('.comment__item_text');

            itemDel[i].addEventListener('click', changeStatus);

            function changeStatus() {
                itemText.remove();
            }
        }
    }
}

ControlCommentHistory();

function ControlCommentHistory() {
    let board = document.querySelector('.board');
    let boardComment = board.querySelector('.board__comment');
    let commentHistory = board.querySelector('.comment-history');
    let commentHistoryBlock = board.querySelector('.comment-history__block');

    boardComment.addEventListener('click', function () {
        EmersionComment('block', 'translateX(0)');
    });

    commentHistory.addEventListener('click', function () {
        EmersionComment('none', 'translateX(764px)');
    });

    function EmersionComment(active, position) {
        commentHistory.style.display = active;
        commentHistoryBlock.style.transform = position;
    }
}





window.appView = new app.AppView;
joint.setTheme('modern');