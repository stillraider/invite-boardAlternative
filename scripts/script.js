BoardManager();
NavigationBoard();
OpenModalWindow();
HeaderActions();
ControlCustomers();


function BoardManager() {
    SwitcherContent();
    UserItemsManager();
    NewUserItemsManager();

    let dropdown = new DropdownManager();
    dropdown.InitDropdowns();

    function DropdownManager() {
        let that = this;
        let lastOpenedRole;

        this.InitDropdowns = function() {
            let selectHeader = document.querySelectorAll('.select__header');
            let selectItem = document.querySelectorAll('.select__item');
            let selectHeaderItem;
            let parentHeaderItem;

            for (let i = 0; i < selectHeader.length; i++) {
                let item = selectHeader[i];

                item.onclick = selectToggle;
                selectHeaderItem = item;

                function selectToggle() {
                    let parentHeader = this.parentNode;
                    parentHeaderItem = parentHeader;

                    parentHeader.querySelector('.select__icon').classList.toggle('rotateIcon');
                    parentHeader.classList.toggle('is-active');

                    that.ChangeCurrent(item, parentHeaderItem);
                    that.DisableLastOpened(parentHeader);
                }
            }

            for (let i = 0; i < selectItem.length; i++) {

                selectItem[i].onclick = selectChoose;

                function selectChoose() {
                    let text = this.innerText,
                    select = this.closest('.select'),
                    currentText = select.querySelector('.select__current');

                    select.classList.remove('is-active');
                    currentText.innerHTML = text;
                    lastOpenedRole.querySelector('.select__icon').classList.remove('rotateIcon');

                    that.ChangeCurrent(selectHeaderItem, parentHeaderItem);
                }
            }
        }

        this.DisableLastOpened = function(newSelectRole) {
            if(lastOpenedRole != null && newSelectRole != lastOpenedRole) {
                lastOpenedRole.classList.remove('is-active');
                lastOpenedRole.querySelector('.select__icon').classList.remove('rotateIcon');
            }
            lastOpenedRole = newSelectRole;
        }

        this.ChangeCurrent = function(newselect, newParrentHeader) {
            if (newParrentHeader.closest('.pop-up__block')) {
                newselect.classList.toggle('changeBorder');
                newselect.querySelector('.select__current').classList.toggle('changeColor');
            }
        }
    }

    function SwitcherContent() {
        let contents = document.querySelector('.invite-board__container').children;
        let tabs = contents[0].querySelectorAll('.invite-board__tabs_item');
        let currentTabs = tabs[0];
        let currentContent = contents[1];

        for (let i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function () {
                SwitchContent(i);
                SwitchTabs(i);

                DisableAllTooltips();
            })
        }

        function SwitchContent(index) {
            currentContent.classList.remove('isActiveInviteBoard');
            currentContent = contents[index + 1];
            currentContent.classList.add('isActiveInviteBoard');
        }

        function SwitchTabs(index) {
            currentTabs.classList.remove('isActiveTab');
            currentTabs = tabs[index];
            currentTabs.classList.add('isActiveTab');
        }
    }

    function DisableAllTooltips() {
        let tooltips = document.querySelectorAll('.isActiveTooltip');

        for (let i = 0; i < tooltips.length; i++) {
            tooltips[i].classList.remove('isActiveTooltip');
        }
    }

    function UserItemsManager() {
        SortAZButton();
        EditInputInfo();
        EditStatus();
        EditButton();
        RemoveItem();

        function SortAZButton() {
            let buttons = document.querySelectorAll('.filter__name');

            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', function () {
                    buttons[i].classList.toggle('isActiveAlphabetically');
                });
            }
        }

        function EditInputInfo() {
            initInput('name');
            initInput('email');

            function initInput(type) {
                let valInput =  document.querySelectorAll('.users__item-editor_input-' + type);

                for (let i = 0; i < valInput.length; i++) {
                    let item = valInput[i];
                    let itemHeader = item.closest('.users__wrapper');
                    let usersInfo = itemHeader.querySelector('.users__info_' + type);
                    item.value = usersInfo.innerText;

                    item.addEventListener('input', changeText);

                    function changeText() {
                        usersInfo.innerHTML = item.value;
                    }
                }
            }
        }

        function EditStatus() {
            const statusClasses = ['statusInvited', 'statusActive'];
            let usersSelect = document.querySelectorAll('.users__select select');

            for (let i = 0; i < usersSelect.length; i++) {
                let item = usersSelect[i];
                let infoStatus = item.closest('.users__wrapper').querySelector('.users__info_status');

                ApplyStatusToSelect();
                usersSelect[i].addEventListener('change', changeStatus);

                function ApplyStatusToSelect() {
                    let typeStatusText = infoStatus.getAttribute('class').replace('users__info_status ', '');
                    let index = statusClasses.indexOf(typeStatusText);
                    item.querySelectorAll('option')[index].selected = 'selected';
                }

                function changeStatus() {
                    infoStatus.setAttribute('class', 'users__info_status');
                    infoStatus.classList.add(statusClasses[item.value]);
                }
            }
        }

        function EditButton() {
            let usersEdit = document.querySelectorAll('.users__edit');

            for (let i = 0; i < usersEdit.length; i++) {
                let item = usersEdit[i].closest('.users__item');
                let usersInfo = item.querySelector('.users__info');
                let usersEditor = item.querySelector('.users__item-editor_wrapper');
                usersInfo.style.display = 'flex';

                CopyTextTo(usersInfo.parentNode, '.users__info_role', '.select__current');

                usersEdit[i].addEventListener('click', toggleEdit);

                function toggleEdit() {
                    let isShowEditor = usersInfo.style.display == 'flex';
                    usersEdit[i].classList.toggle('isActiveCheck');

                    CopyTextTo(usersInfo.parentNode, '.select__current', '.users__info_role');

                    if (isShowEditor) switchVisivble('none', 'flex');
                    else switchVisivble('flex', 'none');

                    function switchVisivble(infoDisplay, editorDisplay) {
                        usersInfo.style.display = infoDisplay;
                        usersEditor.style.display = editorDisplay;
                    }
                }
            }
        }

        function CopyTextTo(nodeParent, fromClassName, toClassName) {
            nodeParent.querySelector(toClassName).innerText = nodeParent.querySelector(fromClassName).innerText;
        }

        function RemoveItem() {
            let usersDel = document.querySelectorAll('.users__del');

            for (let i = 0; i < usersDel.length; i++) {
                let item = usersDel[i];
                let users = item.closest('.users');

                usersDel[i].addEventListener('click', changeStatus);

                function changeStatus() {
                    users.remove();
                }
            }
        }
    }

    function NewUserItemsManager() {
        AddItemButton();
        RemoveUserItem();

        function AddItemButton() {
            let inviteUser = document.querySelector('.invite-user');
            let button = inviteUser.querySelector('.invite-user__add-item');
            let content = inviteUser.querySelector('.invite-user__inner-content');
            let original = inviteUser.querySelector('.invite-user__item');
            let cloneItem = original.cloneNode(true);

            button.addEventListener('click', addItem);
            original.querySelector('input').addEventListener('invalid', invalide);

            function addItem() {
                let inputs = document.querySelectorAll('.invite-user__input');
                let valid = true;

                for (let i = 0; i < inputs.length; i++) {
                    let input = inputs[i];

                    if (input.value == '' || !input.value.match('@.')) {
                        let inputParent = input.parentNode;

                        valid = false;
                        StatrAnimation(inputParent);
                    }
                }

                if (valid) {
                    let cloned = cloneItem.cloneNode(true);

                    content.appendChild(cloned);
                    cloned.querySelector('input').oninvalid = invalide;
                    dropdown.InitDropdowns();
                    dropdown.DisableLastOpened();
                    RemoveUserItem();
                }
            }

            function StatrAnimation(inputParent) {
                inputParent.classList.remove('isActiveTooltip');
                void inputParent.offsetWidth;
                inputParent.classList.add('isActiveTooltip');
            }

            function invalide(e) {
                e.preventDefault();
                let inputParent = this.parentNode;

                StatrAnimation(inputParent);
            }
        }

        function RemoveUserItem() {
            let inviteUserItem = document.querySelectorAll('.invite-user__item_remove');

            for (let i = 0; i < inviteUserItem.length; i++) {
                let item = inviteUserItem[i];
                let userItem = item.parentNode;

                item.addEventListener('click', function () {
                    userItem.remove();
                })
            }
        }
    }
}

function NavigationBoard() {
    // let disclosureNavigation = new ControlMenu();
    // let controlSubmenu = new ControlSubmenu();

    ControlMenu();
    ManagementActive();

    function ControlMenu() {
        // let that = this;
        let headerBurger = document.querySelector('.header__burger');
        let navList = document.querySelector('.navigation__list');
        let navIcon = navList.querySelector('.navigation__icon-items');
        // let naviItems = navList.querySelectorAll('.navigation__list_items');
        let inviteBoard = document.querySelector('.invite-board');
        
        inviteBoard.style.marginLeft = navIcon.offsetWidth + 'px';

        headerBurger.addEventListener('click', ToggleMenu);

        function ToggleMenu() {
            let navIconWidth = navIcon.offsetWidth;
            // let naviItemsWidth = naviItems.offsetWidth;
            let navListWidth = navList.offsetWidth;

            if (navList.parentNode.offsetWidth < navListWidth) {
                navList.parentNode.style.width = navListWidth + 'px';
                inviteBoard.style.marginLeft = navListWidth + 'px';
            }
            
            else {
                navList.parentNode.style.width = navIconWidth + 'px';
                inviteBoard.style.marginLeft = navIconWidth + 'px';
            }
        }

        // let navIcon = document.querySelector('.navigation__icon-items');

        // let hideWidth = navIcon.offsetWidth;
        // let parentNavigation = navigationList.parentNode;
        // let showWidth = navigationList.offsetWidth;


        // headerBurger.addEventListener('click', ToggleMenu);

        // function ToggleMenu() {
        //     Enable(parentNavigation.offsetWidth < showWidth);
        //     controlSubmenu.Enable(true);
        // }

        // Enable = function(isShow) {
        //     let width = isShow ? showWidth : hideWidth;

        //     parentNavigation.style.width = width + 'px';
        //     inviteBoard.style.marginLeft = width + 'px';

        //     if(isShow) headerBurger.classList.add('burger-active');
        //     else headerBurger.classList.remove('burger-active');
        // }
    }

    // function ControlMenu() {
    //     let that = this;
    //     let headerBurger = document.querySelector('.header__burger');
    //     let navigationList = document.querySelector('.navigation__list');
    //     let navIcon = document.querySelector('.navigation__icon-items');
    //     let inviteBoard = document.querySelector('.invite-board');

    //     let hideWidth = navIcon.offsetWidth;
    //     let parentNavigation = navigationList.parentNode;
    //     let showWidth = navigationList.offsetWidth;

    //     inviteBoard.style.marginLeft = hideWidth + 'px';

    //     headerBurger.addEventListener('click', ToggleMenu);

    //     function ToggleMenu() {
    //         that.Enable(parentNavigation.offsetWidth < showWidth);
    //         controlSubmenu.Enable(true);
    //     }

    //     this.Enable = function(isShow) {
    //         let width = isShow ? showWidth : hideWidth;

    //         parentNavigation.style.width = width + 'px';
    //         inviteBoard.style.marginLeft = width + 'px';

    //         if(isShow) headerBurger.classList.add('burger-active');
    //         else headerBurger.classList.remove('burger-active');
    //     }
    // }

    // function ControlSubmenu() {
    //     let that = this;
    //     let navigation = document.querySelector('.navigation');
    //     let navInner = navigation.querySelector('.navigation__list_items-inner');
    //     let itemArrow = navigation.querySelector('.navigation__list_items-arrow');
    //     let navHeader = navigation.querySelector('.navigation__header');
    //     let navFooter = navigation.querySelector('.navigation__footer');
    //     let headerHeight = navHeader.offsetHeight;
    //     let footerHeight = navFooter.offsetHeight;

    //     navHeader.addEventListener('click', Toggle);

    //     function Toggle() {
    //         that.Enable(navInner.offsetHeight > headerHeight);
    //         disclosureNavigation.Enable(true);
    //     }

    //     this.Enable = function(isHide) {
    //         navInner.style.height = (isHide ? headerHeight : headerHeight + footerHeight) +'px';
    //         if(isHide) itemArrow.classList.remove('rotateIcon');
    //         else itemArrow.classList.add('rotateIcon');
    //     }
    // }

    function ManagementActive() {
        let manage = document.querySelector('.manage');
        let workflows = document.querySelector('.workflows');
        let user = document.querySelector('.user');
        let header = document.querySelector('.header');
        let navigation = document.querySelector('.navigation');
        let inviteBoard = document.querySelector('.invite-board');
        let customersbutton = document.querySelector('.customers__button');
        let board = document.querySelector('.board');
        let boardHome = board.querySelector('.board__home');
        let dashboard = document.querySelector('.dashboard');

        manage.addEventListener('click', function () {
            ChangeContent('block', 'none', 'none', 'none', 'none');
        });

        dashboard.addEventListener('click', function () {
            ChangeContent('none', 'none', 'none', 'none','block');
        });

        boardHome.addEventListener('click', function () {
            ActiveBoard('scroll', 'none', 'block');
        });

        customersbutton.addEventListener('click', function () {
            ActiveBoard('hidden', 'block', 'none');
        });

        workflows.addEventListener('click', function () {
            ChangeContent('none', 'block', 'none', 'none', 'none');
        });

        user.addEventListener('click', function () {
            ChangeContent('none', 'none', 'block', 'none', 'none');
        });

        function ActiveBoard(bodyVal, showVal, hiddenVal) {
            document.querySelector('body').style.overflowY = bodyVal;
            board.style.display = showVal;
            header.style.display = hiddenVal;
            navigation.style.display = hiddenVal;
            inviteBoard.style.display = hiddenVal;
        }

        function ChangeContent(manageUse, workUse, inviteUse, boardUse, dashboardUse) {
            let management = document.querySelector('.management');
            let inviteContainer = document.querySelector('.invite-board__container');
            let tableWorkflows = document.querySelector('.customers');
            let dashboards = document.querySelector('.dashboards');

            management.style.display = manageUse;
            tableWorkflows.style.display = workUse;
            inviteContainer.style.display = inviteUse;
            board.style.display = boardUse;
            dashboards.style.display = dashboardUse;
        }
    }
}

function OpenModalWindow() {
    UserMenuHeader();

    function UserMenuHeader() {
        let user = document.querySelector('.header__headline_user');
        let userMenu = document.querySelector('.usermenu');

        user.addEventListener('click', function() {
            showPanel();
        });

        function showPanel() {
            visibleLocation('1', 'visible');

            document.body.addEventListener('click', eventHideLocation);
        }

        function eventHideLocation(e) {
            if(!e.target.classList.contains('header__headline_user') && !e.target.closest('.usermenu')) {
                hidePanel();
            }
        }

        function hidePanel() {
            visibleLocation('0', 'none');

            document.body.removeEventListener('click', eventHideLocation);
        }

        function visibleLocation(opacity, pointerEvents) {
            userMenu.style.opacity = opacity;
            userMenu.style.pointerEvents = pointerEvents;
        }
    }

    ModalWindowManage();

    function ModalWindowManage() {
        let tableItem = document.querySelectorAll('.table__content');
        let wndowManage = document.querySelector('.window-manage');

        for (let i = 0; i < tableItem.length; i++) {
            let item = tableItem[i];

            item.addEventListener('click', function() {
                showPanel();
            });
        }

        function showPanel() {
            visibleLocation('translateX(-15px)');

            document.body.addEventListener('click', eventHideLocation);
        }

        function eventHideLocation(e) {
            if(!e.target.classList.contains('table__content') && !e.target.closest('.window-manage')) {
                hidePanel();
            }
        }

        function hidePanel() {
            visibleLocation('translateX(342px)');

            document.body.removeEventListener('click', eventHideLocation);
        }

        function visibleLocation(translate) {
            wndowManage.style.transform = translate;
        }
    }

    ModalWindowWorkflows();

    function ModalWindowWorkflows() {
        let tableItem = document.querySelectorAll('.customers__item_info');
        let windowWorkFlows = document.querySelector('.window-workFlows');

        for (let i = 0; i < tableItem.length; i++) {
            let item = tableItem[i];

            item.addEventListener('click', function () {
                showPanel();
            });
        }

        function showPanel() {
            visibleLocation('translateX(0)');

            document.body.addEventListener('click', eventHideLocation);
        }

        function eventHideLocation(e) {
            if(!e.target.classList.contains('customers__item_info') && !e.target.closest('.window-workFlows')) {
                hidePanel();
            }
        }

        function hidePanel() {
            visibleLocation('translateX(407px)');

            document.body.removeEventListener('click', eventHideLocation);
        }

        function visibleLocation(translate) {
            windowWorkFlows.style.transform = translate;
        }
    }
}

function HeaderActions() {
    ControlHeaderMode();
    TogglePhone();
    ActiveCalendar();

    function ControlHeaderMode() {
        let modeItem = document.querySelectorAll('.header__mode_item');
        let modeElem = document.querySelector('.header__mode_elem');

        for (let i = 0; i < modeItem.length; i++) {
            let item = modeItem[i];

            item.addEventListener('click',  function () {
                let attrSelectItem = item.getAttribute('class').replace('header__mode_item ','');
                let selectText = item.innerText;

                modeElem.setAttribute('class', 'header__mode_elem');
                modeElem.classList.add(attrSelectItem);
                modeElem.innerHTML = selectText;
                item.parentNode.style.display = 'none';
            });
        }

        modeElem.addEventListener('click', function () {
            let modeWrapper = document.querySelector('.header__mode-wrapper');

            modeWrapper.style.display = 'block';
        });
    }

    function TogglePhone() {
        let headerPhone = document.querySelector('.header__phone');

        headerPhone.addEventListener('click', function () {
            headerPhone.classList.toggle('phoneActive');
        });
    }

    function ActiveCalendar() {
        let headerCalendar = document.querySelector('.header__calendar');
        let calendar = document.querySelector('#calendar');

        headerCalendar.addEventListener('click', function () {
            calendar.classList.toggle('calendarVisible');
        });
    }
}

function ControlCustomers() {
    let customersContent = document.querySelector('.customers__content');
    let customersMenu = customersContent.querySelector('.customers__menu');

    ControlMenuCastomers();
    ActivePopUp();
    SwitchContentCustomers();
    
    function ControlMenuCastomers() {
        let customersMore = Array.prototype.slice.call(customersContent.querySelectorAll('.customers__more'));
        let prevItem = 0;
        
        for (let i = 0; i < customersMore.length; i++) {
            let item = customersMore[i];
    
            item.addEventListener('click',  function () {
                let visibleBlock = customersMenu.style.display == 'block';
                let indexItem = GetIndexItem();
    
                customersMenu.style.top = 46 * indexItem + 67 + 'px';
                customersMenu.style.display = 'block';
                
                if (visibleBlock && prevItem == indexItem) {
                    customersMenu.style.display = 'none';
                }
                prevItem = indexItem;
                
                let clickItem = item.closest('.customers__item');

                TakeWorkflowName = function(input) {
                    input.value = clickItem.querySelector('.info-name').innerText;
                }

                ChangeWorkflowName = function(input) {
                    clickItem.querySelector('.info-name').innerText = input.value;

                }

                DeleteWorkflowItem = function() {
                    clickItem.remove();
                    delete customersMore.splice(GetIndexItem(), 1);
                }

                function GetIndexItem() {
                    return customersMore.indexOf(item);
                }
            });
        }
    }
    
    function ActivePopUp() {
        let customersMenuItem = customersContent.querySelectorAll('.customers__menu_item');
        let headerСontainer = document.querySelector('.header__container');
        let popUp = document.querySelectorAll('.pop-up');
        let popUpCancel = document.querySelectorAll('.pop-up__cancel');
        let popUpApply = document.querySelectorAll('.pop-up__apply');
        
        for (let i = 0; i < customersMenuItem.length; i++) {
            let item = customersMenuItem[i];
            let itemCancel = popUpCancel[i];
            let itemApply = popUpApply[i];
            
            item.addEventListener('click', function () {
                ControlPopUp('hidden', '37px', 'block');
                if (i == 1) TakeWorkflowName(GetInputPopUp(1));
            });
    
            itemCancel.addEventListener('click', function () {
                ControlPopUp('scroll', '20px', 'none');
            });

            itemApply.addEventListener('click', function () {
                ControlPopUp('scroll', '20px', 'none');
                if (i == 1) ChangeWorkflowName(GetInputPopUp(1));
                if (i == 3) DeleteWorkflowItem();
            });

            function ControlPopUp(overFlow, paddIngR, displayPopUp) {
                document.querySelector('body').style.overflowY = overFlow;
                headerСontainer.style.paddingRight = paddIngR;
                popUp[i].style.display = displayPopUp;
                customersMenu.style.display = 'none';
            }
        }
        
        function GetInputPopUp(index) {
            return popUp[index].querySelector('.pop-up__input');
        }
    }

    function SwitchContentCustomers() {
        let customers = document.querySelector('.customers');
        let customersSwitchAll = customers.querySelectorAll('.customers__switch_item');
        let customersWrap = customers.querySelectorAll('.customers__wrapper');
        let prevItem = 2;
        
        for (let i = 0; i < customersSwitchAll.length; i++) {
            let item = customersSwitchAll[i];
    
            item.addEventListener('click',  function () {
                customersWrap[prevItem].style.display = 'none';
                customersSwitchAll[prevItem].classList.remove('isActiveSwitch');
                customersWrap[prevItem = i].style.display = 'flex';
                customersSwitchAll[prevItem = i].classList.add('isActiveSwitch');
            });
        }
    }
}
