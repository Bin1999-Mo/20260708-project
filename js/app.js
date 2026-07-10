(function() {
    'use strict';
    var currentDetailSource = 'business-approval';

    document.addEventListener('DOMContentLoaded', function() {
        initTabs();
        initCenterTabs();
        initDetailTabs();
        initProjectApprovalTabs();
        initLoanDetailTabs();
        initChangeDetailTabs();
        initSidebarNav();
        initStageTabs();
        initHandleButtons();
        initSearchFunction();
        initRadioButtons();
        initRemoveFile();
        initFormButtons();
        initPhotoLibrary();
        initPagedLists();
        initMobileTableLabels();
        initCloseAllMenus();
        hideZeroBadges();
    });

    function initTabs() {
        var navItems = document.querySelectorAll('.nav-tabs .nav-item');
        var tabContents = document.querySelectorAll('.tab-content');
        var stageDetailPage = document.getElementById('stage-detail-page');

        window.switchToTab = function(tabId) {
            var targetNav = document.querySelector('.nav-tabs .nav-item[data-tab="' + tabId + '"]');
            if (targetNav) {
                targetNav.click();
            }
        };

        for (var i = 0; i < navItems.length; i++) {
            (function(index) {
                navItems[index].addEventListener('click', function() {
                    for (var j = 0; j < navItems.length; j++) {
                        navItems[j].classList.remove('active');
                    }

                    for (var k = 0; k < tabContents.length; k++) {
                        tabContents[k].classList.remove('active');
                    }

                    this.classList.add('active');
                    var tabId = this.getAttribute('data-tab');
                    var detailPage = document.getElementById('detail-page');
                    var projectApprovalPage = document.getElementById('project-approval-page');
                    var loanDetailPage = document.getElementById('loan-detail-page');
                    var changeDetailPage = document.getElementById('change-detail-page');
                    var reportDetailPage = document.getElementById('report-detail-page');
                    var classificationDetailPage = document.getElementById('classification-detail-page');
                    var repaymentDetailPage = document.getElementById('repayment-detail-page');
                    if (stageDetailPage) {
                        stageDetailPage.classList.remove('show');
                    }
                    if (detailPage) {
                        detailPage.classList.remove('show');
                    }
                    if (projectApprovalPage) {
                        projectApprovalPage.classList.remove('show');
                    }
                    if (loanDetailPage) {
                        loanDetailPage.classList.remove('show');
                    }
                    if (changeDetailPage) {
                        changeDetailPage.classList.remove('show');
                    }
                    if (reportDetailPage) {
                        reportDetailPage.classList.remove('show');
                    }
                    if (classificationDetailPage) {
                        classificationDetailPage.classList.remove('show');
                    }
                    if (repaymentDetailPage) {
                        repaymentDetailPage.classList.remove('show');
                    }
                    document.body.style.overflow = '';

                    var targetContent = document.getElementById(tabId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                    resetDefaultSubtab(tabId);
                });
            })(i);
        }
    }

    function initCenterTabs() {
        var tabBars = document.querySelectorAll('.center-tabs');

        for (var i = 0; i < tabBars.length; i++) {
            var centerTabs = tabBars[i].querySelectorAll('.center-tab');

            for (var j = 0; j < centerTabs.length; j++) {
                centerTabs[j].addEventListener('click', function() {
                    activateCenterTab(this);
                });
            }
        }
    }

    function getDirectCenterContents(container) {
        var contents = [];
        if (!container || !container.children) {
            return contents;
        }

        for (var i = 0; i < container.children.length; i++) {
            if (container.children[i].classList.contains('center-content')) {
                contents.push(container.children[i]);
            }
        }

        return contents;
    }

    function activateCenterTab(tab) {
        var tabBar = tab.closest('.center-tabs');
        var owner = tabBar ? (tabBar.closest('.post-manage-page, .tab-content') || tabBar.parentElement) : document;
        var tabs = tabBar ? tabBar.querySelectorAll('.center-tab') : document.querySelectorAll('.center-tab');
        var centerContents = getDirectCenterContents(owner);

        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }
        for (var j = 0; j < centerContents.length; j++) {
            centerContents[j].classList.remove('active');
        }

        tab.classList.add('active');
        var subtabId = tab.getAttribute('data-subtab');
        var targetContent = document.getElementById(subtabId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    function resetDefaultSubtab(tabId) {
        var defaultSubtabs = {
            'client-library': 'enterprise-clients',
            'invest-management': 'post-invest-visit'
        };
        var defaultSubtabId = defaultSubtabs[tabId];
        if (!defaultSubtabId) {
            return;
        }

        var tab = document.querySelector('#' + tabId + ' .center-tab[data-subtab="' + defaultSubtabId + '"]');
        if (tab) {
            activateCenterTab(tab);
        }
    }

    window.switchToApprovalSub = function(subtabId) {
        var targetNav = document.querySelector('.nav-tabs .nav-item[data-tab="approval-center"]');
        if (targetNav) {
            targetNav.click();
        }
        var approvalCenter = document.getElementById('approval-center');
        var centerTabs = approvalCenter ? approvalCenter.querySelectorAll('.center-tabs .center-tab') : document.querySelectorAll('.center-tab');
        var centerContents = approvalCenter ? getDirectCenterContents(approvalCenter) : document.querySelectorAll('.center-content');
        for (var j = 0; j < centerTabs.length; j++) {
            centerTabs[j].classList.remove('active');
        }
        for (var k = 0; k < centerContents.length; k++) {
            centerContents[k].classList.remove('active');
        }
        var subtab = document.querySelector('.center-tab[data-subtab="' + subtabId + '"]');
        if (subtab) {
            subtab.classList.add('active');
        }
        var content = document.getElementById(subtabId);
        if (content) {
            content.classList.add('active');
        }
    };

    window.openPostTodo = function() {
        var activePostTab = document.querySelector('#invest-management .post-manage-tabs .center-tab.active');
        var subtabId = activePostTab && activePostTab.getAttribute('data-subtab') === 'five-classification'
            ? 'classification-approval'
            : 'post-visit-approval';
        window.switchToApprovalSub(subtabId);
    };

    function initStageTabs() {
        var stageTabs = document.querySelectorAll('.stage-tabs .stage-tab');
        var stagePanels = document.querySelectorAll('.stage-tab-content');

        for (var i = 0; i < stageTabs.length; i++) {
            stageTabs[i].addEventListener('click', function() {
                for (var j = 0; j < stageTabs.length; j++) {
                    stageTabs[j].classList.remove('active');
                }
                for (var k = 0; k < stagePanels.length; k++) {
                    stagePanels[k].classList.remove('active');
                }

                this.classList.add('active');
                var panelId = this.getAttribute('data-stage-panel');
                var panel = document.getElementById(panelId);
                if (panel) {
                    panel.classList.add('active');
                }
            });
        }
    }

    window.toggleDotMenu = function(event, btn) {
        event.stopPropagation();
        closeAllDotMenus();
        var menu = btn.nextElementSibling;
        if (menu) {
            menu.classList.toggle('show');
        }
    };

    function closeAllDotMenus() {
        var menus = document.querySelectorAll('.dot-menu.show');
        for (var i = 0; i < menus.length; i++) {
            menus[i].classList.remove('show');
        }
    }

    function initCloseAllMenus() {
        document.addEventListener('click', function() {
            closeAllDotMenus();
        });
    }

    function hideZeroBadges() {
        var badges = document.querySelectorAll('.center-badge');
        for (var i = 0; i < badges.length; i++) {
            if (badges[i].textContent.trim() === '0') {
                badges[i].style.display = 'none';
            }
        }
    }

    function initMobileTableLabels() {
        var tables = document.querySelectorAll([
            '.loan-workbench-table-wrap .loan-table',
            '.loan-table-wrapper.data-table-scroll .loan-table',
            '.loan-record-table-wrap .loan-table',
            '.handled-table-wrap .handled-table'
        ].join(','));

        for (var i = 0; i < tables.length; i++) {
            var table = tables[i];
            var headers = table.querySelectorAll('thead th');

            if (!headers.length || !table.tBodies.length) {
                continue;
            }

            table.classList.add('mobile-card-table');

            for (var bodyIndex = 0; bodyIndex < table.tBodies.length; bodyIndex++) {
                var rows = table.tBodies[bodyIndex].rows;

                for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                    var cells = rows[rowIndex].cells;

                    for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                        var header = headers[cellIndex];
                        var label = header ? header.textContent.replace(/\s+/g, ' ').trim() : '';
                        cells[cellIndex].setAttribute('data-label', label);
                    }
                }
            }
        }
    }
    function initDetailTabs() {
        var detailTabs = document.querySelectorAll('#detail-page .detail-tabs .detail-tab');
        var detailContents = document.querySelectorAll('#detail-page .detail-content');

        for (var i = 0; i < detailTabs.length; i++) {
            (function(index) {
                detailTabs[index].addEventListener('click', function() {
                    for (var j = 0; j < detailTabs.length; j++) {
                        detailTabs[j].classList.remove('active');
                        if (detailContents[j]) {
                            detailContents[j].classList.remove('active');
                        }
                    }

                    this.classList.add('active');
                    var tabId = this.getAttribute('data-detail-tab');
                    var targetContent = document.getElementById(tabId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            })(i);
        }
    }

    function initSidebarNav() {
        var sidebarNavItems = document.querySelectorAll('.sidebar-nav .nav-item');

        for (var i = 0; i < sidebarNavItems.length; i++) {
            (function(index) {
                sidebarNavItems[index].addEventListener('click', function() {
                    for (var j = 0; j < sidebarNavItems.length; j++) {
                        sidebarNavItems[j].classList.remove('active');
                    }

                    this.classList.add('active');

                    var navId = this.getAttribute('data-side-nav');
                    var detailTabs = document.querySelectorAll('#detail-page .detail-tabs .detail-tab');

                    if (navId === 'credit' && detailTabs[0]) {
                        detailTabs[0].click();
                    } else if (navId === 'enterprise' && detailTabs[1]) {
                        detailTabs[1].click();
                    }
                });
            })(i);
        }
    }

    function initHandleButtons() {
        var handleButtons = document.querySelectorAll('#approval-center .handle-btn:not(.change-approve-btn)');

        for (var i = 0; i < handleButtons.length; i++) {
            handleButtons[i].addEventListener('click', function(e) {
                e.preventDefault();
                var businessId = this.getAttribute('data-id');
                if (businessId === '4' || businessId === '5') {
                    openProjectApprovalPage(this);
                    return;
                }
                openDetailPage(businessId);
            });
        }
    }

    function openProjectApprovalPage(trigger) {
        var appHeader = document.querySelector('.header');
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var projectPage = document.getElementById('project-approval-page');
        var card = trigger ? trigger.closest('.business-approval-card') : null;
        var company = card ? card.querySelector('.business-company') : null;
        var companyName = company ? company.textContent.trim() : '滨州农村商业银行股份有限公司';
        currentDetailSource = 'business-approval';

        if (appHeader) {
            appHeader.style.display = 'none';
        }

        if (navTabs) {
            navTabs.style.display = 'none';
        }

        for (var i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        setText('project-approval-company', companyName);
        var projectName = document.getElementById('project-approval-name');
        if (projectName) {
            projectName.value = companyName;
        }

        if (projectPage) {
            resetProjectApprovalTabs();
            projectPage.classList.add('show');
            document.body.style.overflow = '';
            window.scrollTo(0, 0);
        }
    }

    function initProjectApprovalTabs() {
        var tabs = document.querySelectorAll('#project-approval-page .project-detail-tabs button');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function() {
                var targetId = this.getAttribute('data-project-tab');
                var allTabs = document.querySelectorAll('#project-approval-page .project-detail-tabs button');
                var panels = document.querySelectorAll('#project-approval-page .project-tab-panel');
                for (var j = 0; j < allTabs.length; j++) {
                    allTabs[j].classList.remove('active');
                }
                for (var k = 0; k < panels.length; k++) {
                    panels[k].classList.remove('active');
                }
                this.classList.add('active');
                var target = document.getElementById(targetId);
                if (target) {
                    target.classList.add('active');
                }
            });
        }
    }

    function resetProjectApprovalTabs() {
        var tabs = document.querySelectorAll('#project-approval-page .project-detail-tabs button');
        var panels = document.querySelectorAll('#project-approval-page .project-tab-panel');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }
        for (var j = 0; j < panels.length; j++) {
            panels[j].classList.remove('active');
        }
        if (tabs[0]) {
            tabs[0].classList.add('active');
        }
        if (panels[0]) {
            panels[0].classList.add('active');
        }
    }

    function openDetailPage(businessId) {
        var appHeader = document.querySelector('.header');
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var detailPage = document.getElementById('detail-page');
        currentDetailSource = 'business-approval';

        if (appHeader) {
            appHeader.style.display = 'none';
        }

        if (navTabs) {
            navTabs.style.display = 'none';
        }

        for (var i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        if (detailPage) {
            resetBusinessDetailTabs();
            detailPage.classList.add('show');
            document.body.style.overflow = '';
            window.scrollTo(0, 0);
        }
    }

    function resetBusinessDetailTabs() {
        var detailTabs = document.querySelectorAll('#detail-page .detail-tabs .detail-tab');
        var detailContents = document.querySelectorAll('#detail-page .detail-content');

        for (var i = 0; i < detailTabs.length; i++) {
            detailTabs[i].classList.remove('active');
        }

        for (var j = 0; j < detailContents.length; j++) {
            detailContents[j].classList.remove('active');
        }

        if (detailTabs[0]) {
            detailTabs[0].classList.add('active');
        }

        if (detailContents[0]) {
            detailContents[0].classList.add('active');
        }
    }

    function initLoanDetailContent() {
        copyContent('project', 'loan-credit-content');
        copyContent('enterprise', 'loan-enterprise-content');
        copyContent('customer', 'loan-customer-content');
        removeLoanCreditUploadButton();
    }

    function initChangeDetailContent() {
        copyContent('loan-project', 'change-project-content');
        copyContent('project', 'change-credit-content');
        copyContent('enterprise', 'change-enterprise-content');
        copyContent('customer', 'change-customer-content');
    }

    function copyContent(sourceId, targetId) {
        var source = document.getElementById(sourceId);
        var target = document.getElementById(targetId);
        if (source && target && !target.innerHTML.trim()) {
            target.innerHTML = source.innerHTML;
        }
    }

    function removeLoanCreditUploadButton() {
        var loanCredit = document.getElementById('loan-credit-content');
        if (!loanCredit) {
            return;
        }

        var uploadButtons = loanCredit.querySelectorAll('.risk-upload-btn');
        for (var i = 0; i < uploadButtons.length; i++) {
            uploadButtons[i].style.display = 'none';
        }
    }

    window.openLoanDetailPage = function(businessId) {
        var appHeader = document.querySelector('.header');
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var detailPage = document.getElementById('loan-detail-page');
        currentDetailSource = 'loan-management';

        initLoanDetailContent();

        if (appHeader) {
            appHeader.style.display = 'none';
        }

        if (navTabs) {
            navTabs.style.display = 'none';
        }

        for (var i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        if (detailPage) {
            resetLoanDetailTabs();
            detailPage.classList.add('show');
            document.body.style.overflow = '';
            window.scrollTo(0, 0);
        }
    };

    window.openChangeDetailPage = function(businessId) {
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var detailPage = document.getElementById('change-detail-page');
        currentDetailSource = 'business-approval';

        initChangeDetailContent();

        if (navTabs) {
            navTabs.style.display = 'none';
        }

        for (var i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        if (detailPage) {
            resetChangeDetailTabs();
            detailPage.classList.add('show');
            document.body.style.overflow = '';
        }
    };

    window.openReportDetailPage = function() {
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var detailPage = document.getElementById('report-detail-page');
        currentDetailSource = 'report-approval';

        if (navTabs) {
            navTabs.style.display = 'none';
        }

        for (var i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        if (detailPage) {
            detailPage.classList.add('show');
            document.body.style.overflow = '';
        }
    };

    function resetLoanDetailTabs() {
        var detailTabs = document.querySelectorAll('#loan-detail-page .loan-detail-tabs .detail-tab');
        var detailContents = document.querySelectorAll('#loan-detail-page .loan-detail-content');

        for (var i = 0; i < detailTabs.length; i++) {
            detailTabs[i].classList.remove('active');
        }

        for (var j = 0; j < detailContents.length; j++) {
            detailContents[j].classList.remove('active');
        }

        if (detailTabs[0]) {
            detailTabs[0].classList.add('active');
        }

        if (detailContents[0]) {
            detailContents[0].classList.add('active');
        }
    }

    function initLoanDetailTabs() {
        var detailTabs = document.querySelectorAll('#loan-detail-page .loan-detail-tabs .detail-tab');
        var detailContents = document.querySelectorAll('#loan-detail-page .loan-detail-content');

        for (var i = 0; i < detailTabs.length; i++) {
            (function(index) {
                detailTabs[index].addEventListener('click', function() {
                    for (var j = 0; j < detailTabs.length; j++) {
                        detailTabs[j].classList.remove('active');
                        if (detailContents[j]) {
                            detailContents[j].classList.remove('active');
                        }
                    }

                    this.classList.add('active');
                    var tabId = this.getAttribute('data-loan-detail-tab');
                    var targetContent = document.getElementById(tabId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            })(i);
        }
    }

    function resetChangeDetailTabs() {
        var detailTabs = document.querySelectorAll('#change-detail-page .change-detail-tabs .detail-tab');
        var detailContents = document.querySelectorAll('#change-detail-page .change-detail-content');

        for (var i = 0; i < detailTabs.length; i++) {
            detailTabs[i].classList.remove('active');
        }

        for (var j = 0; j < detailContents.length; j++) {
            detailContents[j].classList.remove('active');
        }

        if (detailTabs[0]) {
            detailTabs[0].classList.add('active');
        }

        if (detailContents[0]) {
            detailContents[0].classList.add('active');
        }
    }

    function initChangeDetailTabs() {
        var detailTabs = document.querySelectorAll('#change-detail-page .change-detail-tabs .detail-tab');
        var detailContents = document.querySelectorAll('#change-detail-page .change-detail-content');

        for (var i = 0; i < detailTabs.length; i++) {
            (function(index) {
                detailTabs[index].addEventListener('click', function() {
                    for (var j = 0; j < detailTabs.length; j++) {
                        detailTabs[j].classList.remove('active');
                        if (detailContents[j]) {
                            detailContents[j].classList.remove('active');
                        }
                    }

                    this.classList.add('active');
                    var tabId = this.getAttribute('data-change-detail-tab');
                    var targetContent = document.getElementById(tabId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            })(i);
        }
    }

    window.closeModal = function() {
        window.goBack();
    };

    window.showRecordModal = function() {
        var modal = document.getElementById('record-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeRecordModal = function() {
        var modal = document.getElementById('record-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    window.showBusinessApprovalFlow = function() {
        closeAllDotMenus();
        closeRecordModal();
        closeActionModal('business-approval-record-detail-modal');
        showActionModal('business-approval-flow-modal');
    };

    window.closeBusinessApprovalFlow = function() {
        closeActionModal('business-approval-flow-modal');
    };

    window.showBusinessApprovalRecord = function() {
        closeAllDotMenus();
        closeRecordModal();
        closeActionModal('business-approval-flow-modal');
        showActionModal('business-approval-record-detail-modal');
    };

    window.closeBusinessApprovalRecord = function() {
        closeActionModal('business-approval-record-detail-modal');
    };

    window.openEnterpriseClientDetail = function(button) {
        var modal = document.getElementById('enterprise-client-modal');
        var row = button ? button.closest('tr') : null;
        var cells = row ? row.querySelectorAll('td') : [];
        var enterpriseName = cells[0] ? cells[0].textContent.trim() : '山东泉汇产业发展有限公司';
        setInputValue('enterprise-client-name', enterpriseName);
        showActionModal('enterprise-client-modal');
    };

    window.closeEnterpriseClientDetail = function() {
        closeActionModal('enterprise-client-modal');
    };

    window.openIndividualClientDetail = function(button) {
        var row = button ? button.closest('tr') : null;
        var cells = row ? row.querySelectorAll('td') : [];
        setInputValue('individual-client-name', cells[0] ? cells[0].textContent.trim() : '李铁军');
        setInputValue('individual-client-id', cells[1] ? cells[1].textContent.trim() : '371327198305134112');
        var modal = document.getElementById('individual-client-modal');
        var genderSelect = modal ? modal.querySelector('[data-client-field="性别"]') : null;
        if (genderSelect && cells[2]) {
            var gender = cells[2].textContent.trim();
            genderSelect.innerHTML = '<option>' + escapeHtml(gender) + '</option>';
        }
        showActionModal('individual-client-modal');
    };

    window.closeIndividualClientDetail = function() {
        closeActionModal('individual-client-modal');
    };

    window.saveClientDetail = function(type) {
        showClientToast('保存成功');
        console.log(type === 'enterprise' ? '企业客户信息已保存' : '个人客户信息已保存');
    };

    window.exportClientDetail = function(type) {
        var modalId = type === 'enterprise' ? 'enterprise-client-modal' : 'individual-client-modal';
        var modal = document.getElementById(modalId);
        if (!modal) {
            return;
        }

        var form = modal.querySelector('.client-form-grid');
        var fields = form ? form.querySelectorAll('[data-client-field]') : [];
        var title = form ? form.getAttribute('data-client-export-title') : '客户信息';
        var rows = [];

        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            var name = field.getAttribute('data-client-field') || '';
            var value = getFieldValue(field);
            rows.push([name, value]);
        }

        var nameField = type === 'enterprise' ? document.getElementById('enterprise-client-name') : document.getElementById('individual-client-name');
        var fileName = title + '-' + (nameField && nameField.value ? nameField.value : '导出') + '.xls';
        downloadExcelFile(fileName, title, rows);
    };

    function setInputValue(id, value) {
        var input = document.getElementById(id);
        if (input) {
            input.value = value;
        }
    }

    function getFieldValue(field) {
        if (!field) {
            return '';
        }
        if (field.tagName === 'SELECT') {
            return field.options[field.selectedIndex] ? field.options[field.selectedIndex].text : '';
        }
        return typeof field.value === 'string' ? field.value : field.textContent.trim();
    }

    function downloadExcelFile(fileName, title, rows) {
        var html = '<html><head><meta charset="UTF-8"></head><body>';
        html += '<table border="1"><thead><tr><th colspan="2">' + escapeHtml(title) + '</th></tr></thead><tbody>';
        for (var i = 0; i < rows.length; i++) {
            html += '<tr><td>' + escapeHtml(rows[i][0]) + '</td><td>' + escapeHtml(rows[i][1]) + '</td></tr>';
        }
        html += '</tbody></table></body></html>';

        var blob = new Blob(['\ufeff', html], { type: 'application/vnd.ms-excel;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = sanitizeFileName(fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function sanitizeFileName(fileName) {
        return fileName.replace(/[\\/:*?"<>|]/g, '_');
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function showClientToast(message) {
        var oldToast = document.querySelector('.client-save-toast');
        if (oldToast) {
            oldToast.parentNode.removeChild(oldToast);
        }
        var toast = document.createElement('div');
        toast.className = 'client-save-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        window.setTimeout(function() {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 1200);
    }

    window.showLoanRecordModal = function() {
        var modal = document.getElementById('loan-record-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeLoanRecordModal = function() {
        var modal = document.getElementById('loan-record-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    window.showReportRecordModal = function() {
        showActionModal('report-record-modal');
    };

    window.closeReportRecordModal = function() {
        closeActionModal('report-record-modal');
    };

    window.showPostVisitRecordModal = function() {
        showActionModal('post-visit-record-modal');
    };

    window.closePostVisitRecordModal = function() {
        closeActionModal('post-visit-record-modal');
    };

    window.showClassificationRecordModal = function() {
        showActionModal('classification-record-modal');
    };

    window.closeClassificationRecordModal = function() {
        closeActionModal('classification-record-modal');
    };

    window.showRepaymentRecordModal = function() {
        showActionModal('repayment-record-modal');
    };

    window.closeRepaymentRecordModal = function() {
        closeActionModal('repayment-record-modal');
    };

    window.showPostVisitHandleModal = function() {
        showActionModal('post-visit-handle-modal');
    };

    window.closePostVisitHandleModal = function() {
        closeActionModal('post-visit-handle-modal');
    };

    window.showPostVisitDetailModal = function() {
        showActionModal('post-visit-detail-modal');
    };

    window.closePostVisitDetailModal = function() {
        closeActionModal('post-visit-detail-modal');
    };

    window.showInvestClassificationDetail = function() {
        showActionModal('invest-classification-detail-modal');
    };

    window.closeInvestClassificationDetail = function() {
        closeActionModal('invest-classification-detail-modal');
    };

    window.showInvestClassificationApprovalRecord = function() {
        showActionModal('invest-classification-approval-modal');
    };

    window.closeInvestClassificationApprovalRecord = function() {
        closeActionModal('invest-classification-approval-modal');
    };

    window.showInvestClassificationChangeRecord = function() {
        showActionModal('invest-classification-change-modal');
    };

    window.closeInvestClassificationChangeRecord = function() {
        closeActionModal('invest-classification-change-modal');
    };

    window.savePostVisitHandle = function() {
        closePostVisitHandleModal();
    };

    window.submitPostVisitHandle = function() {
        closePostVisitHandleModal();
    };

    window.openClassificationDetailPage = function() {
        var appHeader = document.querySelector('.header');
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var detailPage = document.getElementById('classification-detail-page');
        currentDetailSource = 'classification-approval';

        if (appHeader) {
            appHeader.style.display = 'none';
        }

        if (navTabs) {
            navTabs.style.display = 'none';
        }

        for (var i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        if (detailPage) {
            detailPage.classList.add('show');
            document.body.style.overflow = '';
            window.scrollTo(0, 0);
        }
    };

    window.openRepaymentDetailPage = function() {
        var appHeader = document.querySelector('.header');
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var detailPage = document.getElementById('repayment-detail-page');
        currentDetailSource = 'repayment-approval';

        if (appHeader) {
            appHeader.style.display = 'none';
        }

        if (navTabs) {
            navTabs.style.display = 'none';
        }

        for (var i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        if (detailPage) {
            detailPage.classList.add('show');
            document.body.style.overflow = '';
            window.scrollTo(0, 0);
        }
    };

    window.showLoanApprovalRecordModal = function() {
        showActionModal('loan-approval-record-modal');
    };

    window.closeLoanApprovalRecordModal = function() {
        closeActionModal('loan-approval-record-modal');
    };

    window.showLoanWithdrawModal = function() {
        showActionModal('loan-withdraw-modal');
    };

    window.closeLoanWithdrawModal = function() {
        closeActionModal('loan-withdraw-modal');
    };

    window.confirmLoanWithdraw = function() {
        closeLoanWithdrawModal();
    };

    function showActionModal(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeActionModal(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    window.showApproveModal = function() {
        showActionModal('approve-modal');
    };

    window.closeApproveModal = function() {
        closeActionModal('approve-modal');
    };

    window.showBackModal = function() {
        showActionModal('back-modal');
    };

    window.closeBackModal = function() {
        closeActionModal('back-modal');
    };

    window.showRejectModal = function() {
        showActionModal('reject-modal');
    };

    window.closeRejectModal = function() {
        closeActionModal('reject-modal');
    };

    window.confirmAction = function(actionType) {
        closeApproveModal();
        closeBackModal();
        closeRejectModal();
        window.goBack();
    };

    window.goBack = function() {
        var appHeader = document.querySelector('.header');
        var navTabs = document.querySelector('.nav-tabs');
        var navItems = document.querySelectorAll('.nav-tabs .nav-item');
        var tabContents = document.querySelectorAll('.tab-content');
        var detailPage = document.getElementById('detail-page');
        var projectApprovalPage = document.getElementById('project-approval-page');
        var loanDetailPage = document.getElementById('loan-detail-page');
        var changeDetailPage = document.getElementById('change-detail-page');
        var reportDetailPage = document.getElementById('report-detail-page');
        var stageDetailPage = document.getElementById('stage-detail-page');
        var classificationDetailPage = document.getElementById('classification-detail-page');
        var repaymentDetailPage = document.getElementById('repayment-detail-page');

        if (detailPage) {
            detailPage.classList.remove('show');
        }

        if (projectApprovalPage) {
            projectApprovalPage.classList.remove('show');
        }

        if (loanDetailPage) {
            loanDetailPage.classList.remove('show');
        }

        if (changeDetailPage) {
            changeDetailPage.classList.remove('show');
        }

        if (reportDetailPage) {
            reportDetailPage.classList.remove('show');
        }
        if (stageDetailPage) {
            stageDetailPage.classList.remove('show');
        }
        if (classificationDetailPage) {
            classificationDetailPage.classList.remove('show');
        }
        if (repaymentDetailPage) {
            repaymentDetailPage.classList.remove('show');
        }

        if (navTabs) {
            navTabs.style.display = '';
        }

        if (appHeader) {
            appHeader.style.display = '';
        }

        for (var i = 0; i < navItems.length; i++) {
            navItems[i].classList.remove('active');
        }

        for (var j = 0; j < tabContents.length; j++) {
            tabContents[j].classList.remove('active');
        }

        var isApproval = currentDetailSource === 'business-approval'
            || currentDetailSource === 'loan-management'
            || currentDetailSource === 'report-approval'
            || currentDetailSource === 'post-visit-approval'
            || currentDetailSource === 'classification-approval'
            || currentDetailSource === 'repayment-approval';
        var targetNav = isApproval ? document.querySelector('.nav-tabs .nav-item[data-tab="approval-center"]') : document.querySelector('.nav-tabs .nav-item[data-tab="' + currentDetailSource + '"]');
        var targetContent = isApproval ? document.getElementById('approval-center') : document.getElementById(currentDetailSource);

        if (targetNav) {
            targetNav.classList.add('active');
        }

        if (targetContent) {
            targetContent.classList.add('active');
        }

        if (isApproval) {
            var centerTabs = document.querySelectorAll('.center-tab');
            var centerContents = document.querySelectorAll('.center-content');
            for (var m = 0; m < centerTabs.length; m++) {
                centerTabs[m].classList.remove('active');
            }
            for (var n = 0; n < centerContents.length; n++) {
                centerContents[n].classList.remove('active');
            }
            var subtab = document.querySelector('.center-tab[data-subtab="' + currentDetailSource + '"]');
            if (subtab) {
                subtab.classList.add('active');
            }
            var subContent = document.getElementById(currentDetailSource);
            if (subContent) {
                subContent.classList.add('active');
            }
        }

        document.body.style.overflow = '';
    };

    document.addEventListener('click', function(event) {
        var recordModal = document.getElementById('record-modal');
        var loanRecordModal = document.getElementById('loan-record-modal');
        var reportRecordModal = document.getElementById('report-record-modal');
        var postVisitRecordModal = document.getElementById('post-visit-record-modal');
        var postVisitHandleModal = document.getElementById('post-visit-handle-modal');
        var postVisitDetailModal = document.getElementById('post-visit-detail-modal');
        var classificationRecordModal = document.getElementById('classification-record-modal');
        var repaymentRecordModal = document.getElementById('repayment-record-modal');
        var investClassificationDetailModal = document.getElementById('invest-classification-detail-modal');
        var investClassificationApprovalModal = document.getElementById('invest-classification-approval-modal');
        var investClassificationChangeModal = document.getElementById('invest-classification-change-modal');
        var loanApprovalRecordModal = document.getElementById('loan-approval-record-modal');
        var businessApprovalFlowModal = document.getElementById('business-approval-flow-modal');
        var businessApprovalRecordModal = document.getElementById('business-approval-record-detail-modal');
        var loanWithdrawModal = document.getElementById('loan-withdraw-modal');
        var approveModal = document.getElementById('approve-modal');
        var backModal = document.getElementById('back-modal');
        var rejectModal = document.getElementById('reject-modal');
        var photoDetailModal = document.getElementById('photo-detail-modal');
        var enterpriseClientModal = document.getElementById('enterprise-client-modal');
        var individualClientModal = document.getElementById('individual-client-modal');
        
        if (recordModal && event.target === recordModal) {
            closeRecordModal();
        }

        if (loanRecordModal && event.target === loanRecordModal) {
            closeLoanRecordModal();
        }

        if (reportRecordModal && event.target === reportRecordModal) {
            closeReportRecordModal();
        }

        if (postVisitRecordModal && event.target === postVisitRecordModal) {
            closePostVisitRecordModal();
        }

        if (postVisitHandleModal && event.target === postVisitHandleModal) {
            closePostVisitHandleModal();
        }

        if (postVisitDetailModal && event.target === postVisitDetailModal) {
            closePostVisitDetailModal();
        }

        if (classificationRecordModal && event.target === classificationRecordModal) {
            closeClassificationRecordModal();
        }

        if (repaymentRecordModal && event.target === repaymentRecordModal) {
            closeRepaymentRecordModal();
        }

        if (investClassificationDetailModal && event.target === investClassificationDetailModal) {
            closeInvestClassificationDetail();
        }

        if (investClassificationApprovalModal && event.target === investClassificationApprovalModal) {
            closeInvestClassificationApprovalRecord();
        }

        if (investClassificationChangeModal && event.target === investClassificationChangeModal) {
            closeInvestClassificationChangeRecord();
        }

        if (loanApprovalRecordModal && event.target === loanApprovalRecordModal) {
            closeLoanApprovalRecordModal();
        }

        if (businessApprovalFlowModal && event.target === businessApprovalFlowModal) {
            closeBusinessApprovalFlow();
        }

        if (businessApprovalRecordModal && event.target === businessApprovalRecordModal) {
            closeBusinessApprovalRecord();
        }

        if (loanWithdrawModal && event.target === loanWithdrawModal) {
            closeLoanWithdrawModal();
        }

        if (approveModal && event.target === approveModal) {
            closeApproveModal();
        }

        if (backModal && event.target === backModal) {
            closeBackModal();
        }

        if (rejectModal && event.target === rejectModal) {
            closeRejectModal();
        }

        if (photoDetailModal && event.target === photoDetailModal) {
            closePhotoDetailModal();
        }

        if (enterpriseClientModal && event.target === enterpriseClientModal) {
            closeEnterpriseClientDetail();
        }

        if (individualClientModal && event.target === individualClientModal) {
            closeIndividualClientDetail();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            var enterpriseClientModal = document.getElementById('enterprise-client-modal');
            var individualClientModal = document.getElementById('individual-client-modal');
            if ((enterpriseClientModal && enterpriseClientModal.classList.contains('show')) || (individualClientModal && individualClientModal.classList.contains('show'))) {
                closeEnterpriseClientDetail();
                closeIndividualClientDetail();
                return;
            }
            closeModal();
            closeRecordModal();
            closeLoanRecordModal();
            closeReportRecordModal();
            closePostVisitRecordModal();
            closePostVisitHandleModal();
            closePostVisitDetailModal();
            closeClassificationRecordModal();
            closeInvestClassificationDetail();
            closeInvestClassificationApprovalRecord();
            closeInvestClassificationChangeRecord();
            closeLoanApprovalRecordModal();
            closeLoanWithdrawModal();
            closeApproveModal();
            closeBackModal();
            closeRejectModal();
            closePhotoDetailModal();
            closeEnterpriseClientDetail();
            closeIndividualClientDetail();
        }
    });

    function initSearchFunction() {
        var searchBtn = document.querySelector('.search-btn');
        var resetBtn = document.querySelector('.reset-btn');
        var searchInput = document.querySelector('.search-input');

        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                var keyword = '';
                if (searchInput) {
                    keyword = searchInput.value.trim();
                }
                console.log('搜索关键词:', keyword);
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                if (searchInput) {
                    searchInput.value = '';
                }
                console.log('搜索框已重置');
            });
        }
    }

    function initRadioButtons() {
        var radioItems = document.querySelectorAll('.radio-item');

        for (var i = 0; i < radioItems.length; i++) {
            (function(index) {
                radioItems[index].addEventListener('click', function(e) {
                    if (e.target.tagName === 'INPUT') {
                        return;
                    }

                    var radioGroup = this.parentElement;
                    var radios = radioGroup.querySelectorAll('.radio-item');

                    for (var j = 0; j < radios.length; j++) {
                        radios[j].classList.remove('active');
                    }

                    this.classList.add('active');
                    var input = this.querySelector('input[type="radio"]');
                    if (input) {
                        input.checked = true;
                    }
                });
            })(i);
        }
    }

    function initRemoveFile() {
        var removeBtn = document.querySelector('.remove-file');

        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                var fileItem = this.parentElement;
                if (fileItem) {
                    fileItem.remove();
                }
            });
        }
    }

    function initFormButtons() {
        var primaryBtn = document.querySelector('.btn-primary');
        var secondaryBtn = document.querySelector('.btn-secondary');
        var uploadBtn = document.querySelector('.upload-btn');

        if (primaryBtn) {
            primaryBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('发起授信审批');
            });
        }

        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('暂存信息');
            });
        }

        if (uploadBtn) {
            uploadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('点击上传文件');
            });
        }
    }

    var currentPhotoContext = null;
    var photoStore = {};

    function initPhotoLibrary() {
        var photoLibrary = document.getElementById('photo-library');
        var uploadInput = document.getElementById('photo-upload-input');

        if (!photoLibrary || !uploadInput) {
            return;
        }

        var detailButtons = photoLibrary.querySelectorAll('.photo-detail-btn[data-client]');
        for (var i = 0; i < detailButtons.length; i++) {
            detailButtons[i].addEventListener('click', function() {
                currentPhotoContext = {
                    client: this.getAttribute('data-client') || '--',
                    manager: this.getAttribute('data-manager') || '--',
                    stage: this.getAttribute('data-stage') || '--',
                    button: this
                };
                openPhotoDetailModal();
            });
        }

        uploadInput.addEventListener('change', function() {
            var files = Array.prototype.slice.call(this.files || []);
            if (!files.length || !currentPhotoContext) {
                return;
            }
            this.value = '';
            addPhotosToCurrentContext(files);
        });
    }

    function formatPhotoTime(date) {
        function pad(num) {
            return num < 10 ? '0' + num : '' + num;
        }

        return date.getFullYear() + '-' +
            pad(date.getMonth() + 1) + '-' +
            pad(date.getDate()) + ' ' +
            pad(date.getHours()) + ':' +
            pad(date.getMinutes()) + ':' +
            pad(date.getSeconds());
    }

    function setPhotoPreviewText(id, text) {
        var node = document.getElementById(id);
        if (node) {
            node.textContent = text;
        }
    }

    function getPhotoStoreKey() {
        if (!currentPhotoContext) {
            return '';
        }
        return currentPhotoContext.client + '|' + currentPhotoContext.stage;
    }

    function getPhotoList() {
        var key = getPhotoStoreKey();
        if (!key) {
            return [];
        }
        if (!photoStore[key]) {
            photoStore[key] = [];
        }
        return photoStore[key];
    }

    function openPhotoDetailModal() {
        var modal = document.getElementById('photo-detail-modal');
        var note = document.getElementById('photo-location-note');
        if (!currentPhotoContext || !modal) {
            return;
        }
        setPhotoPreviewText('photo-preview-client', currentPhotoContext.client);
        setPhotoPreviewText('photo-preview-manager', currentPhotoContext.manager);
        setPhotoPreviewText('photo-preview-stage', currentPhotoContext.stage);
        if (note) {
            note.textContent = '上传时会写入拍摄时间；若授权定位，将同步写入经度/纬度水印。';
        }
        renderPhotoUploadList();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    window.triggerPhotoUpload = function() {
        var uploadInput = document.getElementById('photo-upload-input');
        if (uploadInput) {
            uploadInput.click();
        }
    };

    function addPhotosToCurrentContext(files) {
        var note = document.getElementById('photo-location-note');
        if (note) {
            note.textContent = '正在获取实时坐标，请允许浏览器定位。';
        }

        if (!navigator.geolocation) {
            processPhotoFiles(files, '定位不可用');
            if (note) {
                note.textContent = '当前浏览器不支持定位，已保留拍摄时间水印。';
            }
            return;
        }

        navigator.geolocation.getCurrentPosition(function(position) {
            var longitude = position.coords.longitude.toFixed(6);
            var latitude = position.coords.latitude.toFixed(6);
            processPhotoFiles(files, '经度 ' + longitude + ' / 纬度 ' + latitude);
            if (note) {
                note.textContent = '坐标已实时获取，并写入照片水印。';
            }
        }, function(error) {
            var message = error && error.code === 1 ? '定位未授权' : '定位获取失败';
            processPhotoFiles(files, message);
            if (note) {
                note.textContent = '无法获取经纬度，已保留拍摄时间水印。';
            }
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    }

    function processPhotoFiles(files, locationText) {
        for (var i = 0; i < files.length; i++) {
            createWatermarkedPhoto(files[i], locationText, function(photo) {
                getPhotoList().push(photo);
                renderPhotoUploadList();
            });
        }
    }

    function createWatermarkedPhoto(file, locationText, done) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var image = new Image();
            image.onload = function() {
                done(drawPhotoToDataUrl(image, file.name, locationText));
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    function drawPhotoToDataUrl(image, fileName, locationText) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var maxWidth = 1080;
        var scale = Math.min(1, maxWidth / image.width);
        var width = Math.max(1, Math.round(image.width * scale));
        var height = Math.max(1, Math.round(image.height * scale));
        var takenAt = formatPhotoTime(new Date());
        var lines = [
            '客户名称：' + currentPhotoContext.client,
            '所属环节：' + currentPhotoContext.stage,
            '拍摄时间：' + takenAt,
            '地点坐标：' + locationText
        ];
        var fontSize = Math.max(16, Math.round(width * 0.032));
        var padding = Math.max(16, Math.round(width * 0.028));
        var lineHeight = Math.round(fontSize * 1.45);
        var panelHeight = padding * 2 + lineHeight * lines.length;

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.58)';
        ctx.fillRect(0, Math.max(0, height - panelHeight), width, panelHeight);
        ctx.font = fontSize + 'px Arial, Microsoft YaHei, sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'top';

        for (var i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], padding, height - panelHeight + padding + i * lineHeight);
        }

        return {
            name: fileName || '照片',
            time: takenAt,
            location: locationText,
            src: canvas.toDataURL('image/jpeg', 0.86)
        };
    }

    function renderPhotoUploadList() {
        var list = document.getElementById('photo-upload-list');
        var photos = getPhotoList();
        if (!list) {
            return;
        }
        if (!photos.length) {
            list.innerHTML = '<div class="photo-empty">暂无照片，请点击“上传照片”。</div>';
            return;
        }
        var html = '';
        for (var i = 0; i < photos.length; i++) {
            html += '<div class="photo-upload-item">';
            html += '<img src="' + photos[i].src + '" alt="' + photos[i].name + '">';
            html += '<div><strong>' + photos[i].name + '</strong><span>' + photos[i].time + '</span><em>' + photos[i].location + '</em></div>';
            html += '<button type="button" onclick="deleteUploadedPhoto(' + i + ')">删除</button>';
            html += '</div>';
        }
        list.innerHTML = html;
    }

    window.deleteUploadedPhoto = function(index) {
        var photos = getPhotoList();
        if (index >= 0 && index < photos.length) {
            photos.splice(index, 1);
        }
        renderPhotoUploadList();
    };

    window.closePhotoDetailModal = function() {
        var modal = document.getElementById('photo-detail-modal');
        if (modal) {
            modal.classList.remove('show');
        }
        document.body.style.overflow = '';
    };

    window.closePhotoPreviewModal = function() {
        window.closePhotoDetailModal();
    };

    function initPagedLists() {
        setupPagedList({
            containerSelector: '#approval-center .center-content#business-approval',
            listSelector: '.approval-list',
            itemSelector: '.approval-card',
            paginationSelector: '.pagination',
            badgeSelector: '.center-tab[data-subtab="business-approval"] .center-badge',
            pageSize: 5
        });
        setupPagedList({
            containerSelector: '#approval-center .center-content#report-approval',
            listSelector: '.report-card-list',
            itemSelector: '.approval-card',
            paginationSelector: '.pagination',
            badgeSelector: '.center-tab[data-subtab="report-approval"] .center-badge',
            pageSize: 5
        });
    }

    function setupPagedList(options) {
        var container = document.querySelector(options.containerSelector);
        if (!container) {
            return;
        }

        var list = container.querySelector(options.listSelector);
        var pagination = container.querySelector(options.paginationSelector);
        if (!list || !pagination) {
            return;
        }

        var items = list.querySelectorAll(options.itemSelector);
        var total = items.length;
        var pageSize = options.pageSize || 5;
        var pageCount = Math.max(1, Math.ceil(total / pageSize));
        var currentPage = 1;
        var totalNode = pagination.querySelector('.total');
        var controls = pagination.querySelector('.page-controls');
        var badge = options.badgeSelector ? document.querySelector(options.badgeSelector) : null;

        if (badge) {
            badge.textContent = total;
            badge.style.display = total > 0 ? '' : 'none';
        }

        function render() {
            var start = (currentPage - 1) * pageSize;
            var end = start + pageSize;

            for (var i = 0; i < items.length; i++) {
                items[i].style.display = i >= start && i < end ? '' : 'none';
            }

            if (totalNode) {
                totalNode.textContent = '共 ' + total + ' 条';
            }

            if (!controls) {
                return;
            }

            controls.innerHTML = '';
            controls.appendChild(createPageButton('上一页', currentPage === 1, function() {
                currentPage = Math.max(1, currentPage - 1);
                render();
            }));

            for (var page = 1; page <= pageCount; page++) {
                controls.appendChild(createPageButton(page, false, (function(pageNumber) {
                    return function() {
                        currentPage = pageNumber;
                        render();
                    };
                })(page), page === currentPage));
            }

            controls.appendChild(createPageButton('下一页', currentPage === pageCount, function() {
                currentPage = Math.min(pageCount, currentPage + 1);
                render();
            }));
        }

        render();
    }

    function createPageButton(text, disabled, onClick, active) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'page-btn';
        button.textContent = text;

        if (active) {
            button.classList.add('active');
        }

        if (disabled) {
            button.classList.add('disabled');
            button.disabled = true;
        } else {
            button.addEventListener('click', onClick);
        }

        return button;
    }

var stageData = {
    'E2025061100001': {
        companyName: '北京易诚互动网络技术股份有限公司',
        stages: [
            { label: '立项', time: '2025-06-11', operator: '董瑾', status: '已完成' },
            { label: '尽调', time: '2025-06-15', operator: '张伟', status: '进行中' },
            { label: '审批', time: '--', operator: '--', status: '待处理' },
            { label: '合同', time: '--', operator: '--', status: '待处理' },
            { label: '放款', time: '--', operator: '--', status: '待处理' },
            { label: '还款', time: '--', operator: '--', status: '待处理' },
            { label: '结清', time: '--', operator: '--', status: '待处理' }
        ]
    },
    'E2025061100003': {
        companyName: '浙江臻善科技股份有限公司',
        stages: [
            { label: '立项', time: '--', operator: '董瑾', status: '进行中' },
            { label: '尽调', time: '--', operator: '--', status: '待处理' },
            { label: '审批', time: '--', operator: '--', status: '待处理' },
            { label: '合同', time: '--', operator: '--', status: '待处理' },
            { label: '放款', time: '--', operator: '--', status: '待处理' },
            { label: '还款', time: '--', operator: '--', status: '待处理' },
            { label: '结清', time: '--', operator: '--', status: '待处理' }
        ]
    }
};
var currentStageClientId = '';

window.openStageDetail = function(clientId, stepClass) {
    currentStageClientId = clientId;
    var data = stageData[clientId];
    if (!data) { return; }

    var stagePage = document.getElementById('stage-detail-page');
    var titleEl = document.getElementById('stage-company-title');
    var headerCompany = document.getElementById('stage-header-company');

    if (titleEl) { titleEl.textContent = data.companyName; }
    if (headerCompany) { headerCompany.textContent = data.companyName; }

    var navItems = document.querySelectorAll('.nav-tabs .nav-item');
    var tabContents = document.querySelectorAll('.tab-content');
    var navTabs = document.querySelector('.nav-tabs');
    if (navTabs) { navTabs.style.display = 'none'; }
    for (var i = 0; i < navItems.length; i++) { navItems[i].classList.remove('active'); }
    for (var j = 0; j < tabContents.length; j++) { tabContents[j].classList.remove('active'); }

    if (stagePage) {
        currentDetailSource = 'business-flow';
        stagePage.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    var stepNum = 0;
    if (stepClass === 'step-2') { stepNum = 1; }

    switchStage(stepNum);
};

window.closeStageDetail = function() {
    var stagePage = document.getElementById('stage-detail-page');
    if (stagePage) { stagePage.classList.remove('show'); }
    document.body.style.overflow = '';
    window.goBack();
};

    function setText(id, text) {
        var node = document.getElementById(id);
        if (node) {
            node.textContent = text;
        }
    }

    window.switchStage = function(stageIndex) {
        var data = stageData[currentStageClientId];
        if (!data) { return; }
        var stage = data.stages[stageIndex];
        var table = document.getElementById('stage-detail-table');
        var navItems = document.querySelectorAll('.stage-nav-item');

        for (var i = 0; i < navItems.length; i++) {
            navItems[i].classList.remove('active');
            var dot = navItems[i].querySelector('.stage-dot');
            if (dot) {
                dot.classList.remove('active');
                dot.classList.remove('completed');
                if (i < stageIndex) {
                    dot.classList.add('completed');
                } else if (i === stageIndex) {
                    dot.classList.add('active');
                }
            }
        }
        var targetNav = document.querySelector('.stage-nav-item[data-stage-index="' + stageIndex + '"]');
        if (!targetNav && navItems[stageIndex]) {
            targetNav = navItems[stageIndex];
        }
        if (targetNav) {
            targetNav.classList.add('active');
            var targetDot = targetNav.querySelector('.stage-dot');
            if (targetDot) {
                targetDot.classList.add('active');
            }
        }

        var html = '';
        html += '<div class="info-row"><span class="label">环节名称：</span><span class="value" id="stage-phase-name">' + stage.label + '</span></div>';
        html += '<div class="info-row"><span class="label">处理时间：</span><span class="value" id="stage-handler-time">' + stage.time + '</span></div>';
        html += '<div class="info-row"><span class="label">处理人：</span><span class="value" id="stage-handler-name">' + stage.operator + '</span></div>';
        html += '<div class="info-row"><span class="label">状态：</span><span class="value" id="stage-handler-status">' + stage.status + '</span></div>';
        html += '<div class="info-row"><span class="label">客户名称：</span><span class="value">' + data.companyName + '</span></div>';
        html += '<div class="info-row"><span class="label">负责部门：</span><span class="value">业务部</span></div>';
        html += '<div class="info-row"><span class="label">主办业务经理：</span><span class="value">董瑾</span></div>';
        if (table) { table.innerHTML = html; }

        var statusTag = document.getElementById('stage-status-tag');
        if (statusTag) { statusTag.textContent = stage.status; }

        var currentLabel = document.getElementById('stage-current-label');
        if (currentLabel) { currentLabel.textContent = '当前：' + stage.label + '阶段'; }

        setText('stage-phase-tag', stage.label === '尽调' ? '尽调调查' : stage.label + '阶段');
        setText('stage-phase-name', stage.label);
        setText('stage-handler-time', stage.time);
        setText('stage-handler-name', stage.operator);
        setText('stage-handler-status', stage.status);
        setText('stage-process-title', stage.label + '信息');
    };
})();
