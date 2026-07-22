(function() {
    'use strict';
    var currentDetailSource = 'business-approval';

    document.addEventListener('DOMContentLoaded', function() {
        initTabs();
        initHomeDashboard();
        initMoreActions();
        initUserMenu();
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
        initOverdueReportPage();
        initCloseAllMenus();
        hideZeroBadges();
    });

    function initHomeDashboard() {
        var home = document.getElementById('home-dashboard');
        if (!home) {
            return;
        }
        updateHomeDashboardShell(home.classList.contains('active') ? 'home-dashboard' : '');
        drawHomeMetricChart();
        var resizeFrame = null;
        window.addEventListener('resize', function() {
            if (resizeFrame) {
                window.cancelAnimationFrame(resizeFrame);
            }
            resizeFrame = window.requestAnimationFrame(function() {
                drawHomeMetricChart();
                resizeFrame = null;
            });
        });
    }

    function updateHomeDashboardShell(tabId) {
        var isHome = tabId === 'home-dashboard';
        document.body.classList.toggle('home-dashboard-active', isHome);
        if (isHome) {
            window.requestAnimationFrame(drawHomeMetricChart);
        }
    }

    function drawHomeMetricChart() {
        var canvas = document.getElementById('home-metric-chart');
        if (!canvas || !canvas.parentElement || !canvas.parentElement.clientWidth) {
            return;
        }
        var width = canvas.parentElement.clientWidth;
        var height = canvas.parentElement.clientHeight || 280;
        var ratio = Math.max(1, window.devicePixelRatio || 1);
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        var ctx = canvas.getContext('2d');
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.clearRect(0, 0, width, height);

        var data = [
            { label: '新增投放项目数', month: 100, year: 150 },
            { label: '回收项目数', month: 140, year: 100 },
            { label: '在投项目数', month: 230, year: 200 }
        ];
        var colors = { month: '#4799ee', year: '#20cbd0' };
        var left = width < 520 ? 34 : 46;
        var right = 10;
        var top = 52;
        var bottom = 42;
        var plotWidth = Math.max(1, width - left - right);
        var plotHeight = Math.max(1, height - top - bottom);
        var maxValue = 250;
        var ticks = [0, 50, 100, 150, 200, 250];
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';
        ctx.textBaseline = 'middle';

        var legendY = 18;
        var legendStart = Math.max(8, width / 2 - 58);
        ctx.fillStyle = colors.month;
        ctx.fillRect(legendStart, legendY - 6, 23, 12);
        ctx.fillStyle = '#6f7783';
        ctx.textAlign = 'left';
        ctx.fillText('本月', legendStart + 29, legendY);
        ctx.fillStyle = colors.year;
        ctx.fillRect(legendStart + 65, legendY - 6, 23, 12);
        ctx.fillStyle = '#6f7783';
        ctx.fillText('本年', legendStart + 94, legendY);

        for (var tickIndex = 0; tickIndex < ticks.length; tickIndex++) {
            var tick = ticks[tickIndex];
            var y = top + plotHeight - (tick / maxValue) * plotHeight;
            ctx.strokeStyle = '#edf1f5';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(left, y);
            ctx.lineTo(left + plotWidth, y);
            ctx.stroke();
            ctx.fillStyle = '#7e8792';
            ctx.textAlign = 'right';
            ctx.fillText(String(tick), left - 7, y);
        }

        ctx.strokeStyle = '#9ea7b3';
        ctx.beginPath();
        ctx.moveTo(left, top + plotHeight);
        ctx.lineTo(left + plotWidth, top + plotHeight);
        ctx.stroke();

        var groupWidth = plotWidth / data.length;
        var barWidth = Math.max(13, Math.min(24, groupWidth * 0.22));
        var barGap = 3;
        for (var i = 0; i < data.length; i++) {
            var center = left + groupWidth * (i + 0.5);
            var monthHeight = data[i].month / maxValue * plotHeight;
            var yearHeight = data[i].year / maxValue * plotHeight;
            var monthX = center - barWidth - barGap / 2;
            var yearX = center + barGap / 2;
            var monthY = top + plotHeight - monthHeight;
            var yearY = top + plotHeight - yearHeight;
            ctx.fillStyle = colors.month;
            ctx.fillRect(monthX, monthY, barWidth, monthHeight);
            ctx.fillStyle = colors.year;
            ctx.fillRect(yearX, yearY, barWidth, yearHeight);

            ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = colors.month;
            ctx.fillText(String(data[i].month), monthX + barWidth / 2, Math.max(top + 6, monthY - 8));
            ctx.fillStyle = colors.year;
            ctx.fillText(String(data[i].year), yearX + barWidth / 2, Math.max(top + 6, yearY - 8));
            ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';
            ctx.fillStyle = '#6f7783';
            ctx.fillText(data[i].label, center, top + plotHeight + 20);
        }
    }

    function initOverdueReportPage() {
        var page = document.getElementById('report-detail-page');
        if (!page) {
            return;
        }

        var unitButtons = page.querySelectorAll('[data-report-unit]');
        var unitLabels = page.querySelectorAll('[data-report-unit-label]');
        for (var i = 0; i < unitButtons.length; i++) {
            unitButtons[i].addEventListener('click', function() {
                for (var j = 0; j < unitButtons.length; j++) {
                    unitButtons[j].classList.remove('active');
                }
                this.classList.add('active');
                var unit = this.getAttribute('data-report-unit');
                for (var k = 0; k < unitLabels.length; k++) {
                    unitLabels[k].textContent = unit;
                }
            });
        }

        var actionButtons = page.querySelectorAll('[data-report-action]');
        for (var actionIndex = 0; actionIndex < actionButtons.length; actionIndex++) {
            actionButtons[actionIndex].addEventListener('click', function() {
                var action = this.getAttribute('data-report-action');
                if (action === 'reset') {
                    var fields = page.querySelectorAll('[data-overdue-filter]');
                    for (var fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
                        if (fields[fieldIndex].tagName === 'SELECT') {
                            fields[fieldIndex].selectedIndex = 0;
                        } else {
                            fields[fieldIndex].value = '';
                        }
                    }
                    showClientToast('筛选条件已重置');
                    return;
                }
                if (action === 'query') {
                    showClientToast('查询完成，共 1 条记录');
                    return;
                }
                if (action === 'export') {
                    showClientToast('逾期项目台账已导出');
                    return;
                }
                if (action === 'view') {
                    showClientToast('正在查看项目详情');
                }
            });
        }

        var tableScroller = page.querySelector('.overdue-table-wrap');
        var summaryScroller = page.querySelector('.overdue-summary-viewport');
        if (tableScroller && summaryScroller) {
            tableScroller.addEventListener('scroll', function() {
                summaryScroller.scrollLeft = tableScroller.scrollLeft;
            }, { passive: true });
        }
    }

    function initTabs() {
        var navItems = document.querySelectorAll('.nav-tabs .nav-item');
        var tabContents = document.querySelectorAll('.tab-content');
        var stageDetailPage = document.getElementById('stage-detail-page');
        var moreToggle = document.querySelector('.nav-more-toggle');

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
                    if (moreToggle) {
                        moreToggle.classList.remove('active');
                    }

                    for (var k = 0; k < tabContents.length; k++) {
                        tabContents[k].classList.remove('active');
                    }

                    this.classList.add('active');
                    if (moreToggle && this.classList.contains('nav-more-item')) {
                        moreToggle.classList.add('active');
                    }
                    var tabId = this.getAttribute('data-tab');
                    updateHomeDashboardShell(tabId);
                    var detailPage = document.getElementById('detail-page');
                    var projectApprovalPage = document.getElementById('project-approval-page');
                    var loanDetailPage = document.getElementById('loan-detail-page');
                    var changeDetailPage = document.getElementById('change-detail-page');
                    var reportDetailPage = document.getElementById('report-detail-page');
                    var classificationDetailPage = document.getElementById('classification-detail-page');
                    var repaymentDetailPage = document.getElementById('repayment-detail-page');
                    var postVisitHandlePage = document.getElementById('post-visit-handle-page');
                    var stageRepaymentPlanPage = document.getElementById('stage-repayment-plan-page');
                    var photoAddPage = document.getElementById('photo-add-page');
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
                    if (postVisitHandlePage) {
                        postVisitHandlePage.classList.remove('show');
                    }
                    if (stageRepaymentPlanPage) {
                        stageRepaymentPlanPage.classList.remove('show');
                    }
                    if (photoAddPage) {
                        photoAddPage.classList.remove('show');
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

    function initMoreActions() {
        var more = document.querySelector('.nav-more');
        var toggle = more ? more.querySelector('.nav-more-toggle') : null;
        var menu = more ? more.querySelector('.nav-more-menu') : null;

        if (!more || !toggle || !menu) {
            return;
        }

        function setOpen(open) {
            more.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        toggle.addEventListener('click', function(event) {
            event.stopPropagation();
            setOpen(!more.classList.contains('open'));
        });

        menu.addEventListener('click', function() {
            setOpen(false);
        });

        document.addEventListener('click', function(event) {
            if (!more.contains(event.target)) {
                setOpen(false);
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && more.classList.contains('open')) {
                setOpen(false);
                toggle.focus();
            }
        });
    }

    function initUserMenu() {
        var menu = document.querySelector('.user-menu');
        var trigger = menu ? menu.querySelector('.user-menu-trigger') : null;
        var panel = menu ? menu.querySelector('.user-menu-panel') : null;
        var avatarInput = menu ? menu.querySelector('.user-avatar-input') : null;

        if (!menu || !trigger || !panel) {
            return;
        }

        function setOpen(open) {
            menu.classList.toggle('open', open);
            trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        trigger.addEventListener('click', function(event) {
            event.stopPropagation();
            setOpen(!menu.classList.contains('open'));
        });

        panel.addEventListener('click', function(event) {
            var actionItem = event.target.closest('[data-user-action]');
            if (!actionItem) {
                return;
            }

            var action = actionItem.getAttribute('data-user-action');
            setOpen(false);

            if (action === 'change-avatar' && avatarInput) {
                avatarInput.click();
                return;
            }

            if (action === 'switch-product') {
                showClientToast('产品切换功能为原型演示');
            } else if (action === 'change-password') {
                showClientToast('修改密码功能为原型演示');
            } else if (action === 'logout') {
                showClientToast('退出登录功能为原型演示');
            }
        });

        if (avatarInput) {
            avatarInput.addEventListener('change', function() {
                var file = this.files && this.files[0];
                if (!file || file.type.indexOf('image/') !== 0) {
                    return;
                }

                var avatar = trigger.querySelector('.avatar');
                var imageUrl = URL.createObjectURL(file);
                if (avatar) {
                    avatar.src = imageUrl;
                    avatar.style.display = '';
                    avatar.onload = function() {
                        URL.revokeObjectURL(imageUrl);
                    };
                }
                showClientToast('头像已更新');
                this.value = '';
            });
        }

        document.addEventListener('click', function(event) {
            if (!menu.contains(event.target)) {
                setOpen(false);
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && menu.classList.contains('open')) {
                setOpen(false);
                trigger.focus();
            }
        });
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
            '.handled-table-wrap .handled-table',
            '.repayment-detail-page .repayment-plan-table',
            '.repayment-detail-page .repayment-apply-table'
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
        var handleButtons = document.querySelectorAll('#business-approval .business-handle-btn:not(.change-approve-btn)');

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
        var appHeader = document.querySelector('.header');
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var detailPage = document.getElementById('change-detail-page');
        currentDetailSource = 'business-approval';

        initChangeDetailContent();

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
            resetChangeDetailTabs();
            detailPage.classList.add('show');
            document.body.style.overflow = '';
        }
    };

    window.openReportDetailPage = function() {
        var appHeader = document.querySelector('.header');
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var approvalCenter = document.getElementById('approval-center');
        var approvalSections = approvalCenter ? approvalCenter.querySelectorAll('.center-content') : [];
        var detailPage = document.getElementById('report-detail-page');
        currentDetailSource = 'report-approval';

        if (appHeader) {
            appHeader.style.display = 'none';
        }

        if (navTabs) {
            navTabs.style.display = 'none';
        }

        for (var i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        if (approvalCenter) {
            approvalCenter.classList.add('active');
            approvalCenter.classList.add('report-detail-mode');
        }

        for (var j = 0; j < approvalSections.length; j++) {
            approvalSections[j].classList.remove('active');
        }

        if (detailPage) {
            detailPage.classList.add('show');
            document.body.style.overflow = '';
            window.scrollTo(0, 0);
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

    window.openPostVisitHandlePage = function() {
        var appHeader = document.querySelector('.header');
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var detailPage = document.getElementById('post-visit-handle-page');
        currentDetailSource = 'post-visit-approval';

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

    window.closePostVisitHandlePage = function() {
        var detailPage = document.getElementById('post-visit-handle-page');
        if (detailPage && detailPage.classList.contains('show')) {
            window.goBack();
        }
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
        closePostVisitHandlePage();
    };

    window.submitPostVisitHandle = function() {
        closePostVisitHandlePage();
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
        var approvalCenter = document.getElementById('approval-center');
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
        var postVisitHandlePage = document.getElementById('post-visit-handle-page');
        var stageRepaymentPlanPage = document.getElementById('stage-repayment-plan-page');

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
        if (postVisitHandlePage) {
            postVisitHandlePage.classList.remove('show');
        }
        if (stageRepaymentPlanPage) {
            stageRepaymentPlanPage.classList.remove('show');
        }
        if (approvalCenter) {
            approvalCenter.classList.remove('report-detail-mode');
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
            var moreToggle = document.querySelector('.nav-more-toggle');
            if (moreToggle) {
                moreToggle.classList.toggle('active', targetNav.classList.contains('nav-more-item'));
            }
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
            closePostVisitHandlePage();
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
            if (window.closeStageRepaymentPlanPage) {
                closeStageRepaymentPlanPage();
            }
            if (window.closeAssetDetail) {
                closeAssetDetail();
            }
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
    var pendingPhotoFiles = [];
    var pendingPhotoContext = null;
    var photoUsageDraft = [];

    function initPhotoLibrary() {
        var photoLibrary = document.getElementById('photo-library');

        if (!photoLibrary) {
            return;
        }

        var detailButtons = photoLibrary.querySelectorAll('.photo-detail-btn[data-client]');
        for (var i = 0; i < detailButtons.length; i++) {
            bindPhotoDetailButton(detailButtons[i]);
        }

        var projectKeyword = document.getElementById('photo-project-keyword');
        var projectQuery = document.getElementById('photo-project-query');
        var projectResults = document.getElementById('photo-project-results');
        var addUploadInput = document.getElementById('photo-add-upload-input');
        var addCameraInput = document.getElementById('photo-add-camera-input');

        if (projectQuery && projectKeyword && projectResults) {
            projectQuery.addEventListener('click', runPhotoProjectQuery);
            projectKeyword.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    runPhotoProjectQuery();
                }
            });

            var projectOptions = projectResults.querySelectorAll('button[data-project]');
            for (var optionIndex = 0; optionIndex < projectOptions.length; optionIndex++) {
                projectOptions[optionIndex].addEventListener('click', function() {
                    projectKeyword.value = this.getAttribute('data-project') || '';
                    currentPhotoContext = {
                        client: projectKeyword.value,
                        manager: '--',
                        stage: '立项',
                        projectDate: this.getAttribute('data-date') || '',
                        button: null
                    };
                    projectResults.hidden = true;
                    projectKeyword.setAttribute('aria-expanded', 'false');
                    renderPhotoAddList();
                });
            }

            projectKeyword.addEventListener('input', function() {
                if (currentPhotoContext && projectKeyword.value.trim() !== currentPhotoContext.client) {
                    currentPhotoContext = null;
                    renderPhotoAddList();
                }
            });

            document.addEventListener('click', function(event) {
                var searchRow = document.querySelector('.photo-add-search-row');
                if (searchRow && !searchRow.contains(event.target)) {
                    projectResults.hidden = true;
                    projectKeyword.setAttribute('aria-expanded', 'false');
                }
            });
        }

        if (addUploadInput) {
            addUploadInput.addEventListener('change', function() {
                handlePhotoInputFiles(this.files);
                this.value = '';
            });
        }

        if (addCameraInput) {
            addCameraInput.addEventListener('change', function() {
                handlePhotoInputFiles(this.files);
                this.value = '';
            });
        }
    }

    function bindPhotoDetailButton(button) {
        if (!button || button.getAttribute('data-photo-bound') === 'true') {
            return;
        }
        button.setAttribute('data-photo-bound', 'true');
        button.addEventListener('click', function() {
            currentPhotoContext = {
                client: this.getAttribute('data-client') || '--',
                manager: this.getAttribute('data-manager') || '--',
                stage: this.getAttribute('data-stage') || '--',
                projectDate: this.getAttribute('data-project-date') || '',
                button: this
            };
            openPhotoDetailModal();
        });
    }

    function runPhotoProjectQuery() {
        var projectKeyword = document.getElementById('photo-project-keyword');
        var projectResults = document.getElementById('photo-project-results');
        if (!projectKeyword || !projectResults) {
            return;
        }

        var keyword = projectKeyword.value.trim();
        if (!keyword) {
            projectResults.hidden = true;
            projectKeyword.setAttribute('aria-expanded', 'false');
            showClientToast('请输入项目名称');
            return;
        }

        if (keyword.indexOf('云集') !== -1) {
            projectResults.hidden = false;
            projectKeyword.setAttribute('aria-expanded', 'true');
            return;
        }

        projectResults.hidden = true;
        projectKeyword.setAttribute('aria-expanded', 'false');
        showClientToast('未查询到匹配项目');
    }

    window.openPhotoAddPage = function() {
        var appHeader = document.querySelector('.header');
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var addPage = document.getElementById('photo-add-page');
        var projectKeyword = document.getElementById('photo-project-keyword');
        var projectResults = document.getElementById('photo-project-results');

        if (appHeader) {
            appHeader.style.display = 'none';
        }
        if (navTabs) {
            navTabs.style.display = 'none';
        }
        for (var i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }
        if (projectKeyword) {
            projectKeyword.value = '';
            projectKeyword.setAttribute('aria-expanded', 'false');
        }
        if (projectResults) {
            projectResults.hidden = true;
        }
        currentPhotoContext = null;
        pendingPhotoFiles = [];
        pendingPhotoContext = null;
        renderPhotoAddList();
        setPhotoAddLocationNote('照片将添加拍摄时间和实时地点水印。');
        if (addPage) {
            addPage.classList.add('show');
            window.scrollTo(0, 0);
        }
    };

    window.closePhotoAddPage = function() {
        var appHeader = document.querySelector('.header');
        var navTabs = document.querySelector('.nav-tabs');
        var addPage = document.getElementById('photo-add-page');
        var photoLibrary = document.getElementById('photo-library');
        var photoNav = document.querySelector('.nav-tabs .nav-item[data-tab="photo-library"]');
        var moreToggle = document.querySelector('.nav-more-toggle');

        if (addPage) {
            addPage.classList.remove('show');
        }
        if (appHeader) {
            appHeader.style.display = '';
        }
        if (navTabs) {
            navTabs.style.display = '';
        }
        if (photoLibrary) {
            photoLibrary.classList.add('active');
        }
        if (photoNav) {
            photoNav.classList.add('active');
        }
        if (moreToggle) {
            moreToggle.classList.add('active');
        }
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
    };

    window.triggerPhotoAddUpload = function() {
        var projectKeyword = document.getElementById('photo-project-keyword');
        var addUploadInput = document.getElementById('photo-add-upload-input');
        if (!isPhotoProjectSelected(projectKeyword)) {
            return;
        }
        if (addUploadInput) {
            addUploadInput.click();
        }
    };

    window.triggerPhotoCapture = function() {
        var projectKeyword = document.getElementById('photo-project-keyword');
        var cameraInput = document.getElementById('photo-add-camera-input');
        if (!isPhotoProjectSelected(projectKeyword)) {
            return;
        }
        if (cameraInput) {
            cameraInput.click();
        }
    };

    window.savePhotoAddPage = function() {
        var projectKeyword = document.getElementById('photo-project-keyword');
        if (!isPhotoProjectSelected(projectKeyword)) {
            return;
        }
        if (!getPhotoList().length) {
            showClientToast('请先上传或拍摄照片');
            return;
        }
        ensurePhotoLibraryRow(currentPhotoContext);
        showClientToast('照片保存成功');
        window.closePhotoAddPage();
    };

    function isPhotoProjectSelected(projectKeyword) {
        if (!projectKeyword || !projectKeyword.value.trim() || !currentPhotoContext ||
            projectKeyword.value.trim() !== currentPhotoContext.client) {
            showClientToast('请先查询并选择项目');
            return false;
        }
        return true;
    }

    function setPhotoAddLocationNote(message) {
        var note = document.getElementById('photo-add-location-note');
        if (note) {
            note.textContent = message;
        }
    }

    function handlePhotoInputFiles(fileList) {
        var files = Array.prototype.slice.call(fileList || []);
        if (!files.length || !currentPhotoContext) {
            return;
        }
        pendingPhotoFiles = files;
        pendingPhotoContext = {
            client: currentPhotoContext.client,
            manager: currentPhotoContext.manager,
            stage: currentPhotoContext.stage,
            projectDate: currentPhotoContext.projectDate || '',
            button: currentPhotoContext.button || null
        };
        requestPhotoLocation();
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

    function getPhotoStoreKey(context) {
        var targetContext = context || currentPhotoContext;
        if (!targetContext) {
            return '';
        }
        return targetContext.client + '|' + targetContext.stage + '|' + (targetContext.projectDate || '');
    }

    function getPhotoList(context) {
        var key = getPhotoStoreKey(context);
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
        if (!currentPhotoContext || !modal) {
            return;
        }
        setPhotoPreviewText('photo-preview-client', currentPhotoContext.client);
        setPhotoPreviewText('photo-preview-manager', currentPhotoContext.manager);
        setPhotoPreviewText('photo-preview-stage', currentPhotoContext.stage);
        photoUsageDraft = getPhotoList().map(function(photo) {
            return Boolean(photo.used);
        });
        renderPhotoDetailGallery();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function requestPhotoLocation() {
        if (!pendingPhotoFiles.length || !pendingPhotoContext) {
            return;
        }
        setPhotoAddLocationNote('正在获取实时地点，请允许浏览器定位。');

        if (!navigator.geolocation) {
            showPhotoLocationFallback('当前浏览器不支持定位。可继续上传并仅保留拍摄时间水印。');
            return;
        }

        navigator.geolocation.getCurrentPosition(function(position) {
            var longitude = position.coords.longitude.toFixed(6);
            var latitude = position.coords.latitude.toFixed(6);
            var files = pendingPhotoFiles.slice();
            var context = pendingPhotoContext;
            pendingPhotoFiles = [];
            pendingPhotoContext = null;
            hidePhotoLocationFallback();
            processPhotoFiles(files, '经度 ' + longitude + '，纬度 ' + latitude, context);
            setPhotoAddLocationNote('实时地点已获取，照片将同时写入时间和地点水印。');
        }, function(error) {
            var message = error && error.code === 1
                ? '定位权限未开启。请在浏览器地址栏旁的位置权限中选择“允许”，然后重新授权；也可以继续上传并仅保留拍摄时间水印。'
                : '暂时无法获取实时地点。请检查系统定位或网络后重新授权；也可以继续上传并仅保留拍摄时间水印。';
            showPhotoLocationFallback(message);
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    }

    function showPhotoLocationFallback(message) {
        var modal = document.getElementById('photo-location-modal');
        var messageNode = document.getElementById('photo-location-message');
        if (messageNode) {
            messageNode.textContent = message;
        }
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        setPhotoAddLocationNote('未获取到实时地点，请重新授权或选择继续上传。');
    }

    function hidePhotoLocationFallback() {
        var modal = document.getElementById('photo-location-modal');
        if (modal) {
            modal.classList.remove('show');
        }
        document.body.style.overflow = '';
    }

    window.retryPhotoLocation = function() {
        var messageNode = document.getElementById('photo-location-message');
        if (messageNode) {
            messageNode.textContent = '正在重新请求定位，请在浏览器提示中选择“允许”……';
        }
        requestPhotoLocation();
    };

    window.continuePhotoUploadWithoutLocation = function() {
        var files = pendingPhotoFiles.slice();
        var context = pendingPhotoContext;
        pendingPhotoFiles = [];
        pendingPhotoContext = null;
        hidePhotoLocationFallback();
        if (files.length && context) {
            processPhotoFiles(files, '未获取定位', context);
            setPhotoAddLocationNote('已继续上传：照片保留拍摄时间水印，地点标记为“未获取定位”。');
        }
    };

    function processPhotoFiles(files, locationText, context) {
        var targetContext = context || currentPhotoContext;
        for (var i = 0; i < files.length; i++) {
            createWatermarkedPhoto(files[i], locationText, targetContext, function(photo) {
                getPhotoList(targetContext).push(photo);
                ensurePhotoLibraryRow(targetContext);
                renderPhotoAddList();
                renderPhotoDetailGallery();
            });
        }
    }

    function createWatermarkedPhoto(file, locationText, context, done) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var image = new Image();
            image.onload = function() {
                var takenAt = formatPhotoTime(new Date(file.lastModified || Date.now()));
                done(drawPhotoToDataUrl(image, file.name, locationText, context, takenAt));
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    function drawPhotoToDataUrl(image, fileName, locationText, context, takenAt) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var maxWidth = 1080;
        var scale = Math.min(1, maxWidth / image.width);
        var width = Math.max(1, Math.round(image.width * scale));
        var height = Math.max(1, Math.round(image.height * scale));
        var targetContext = context || currentPhotoContext;
        var lines = [
            '项目名称：' + targetContext.client,
            '所属环节：' + targetContext.stage,
            '拍摄时间：' + takenAt,
            '实时地点：' + locationText
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
            used: false,
            src: canvas.toDataURL('image/jpeg', 0.86)
        };
    }

    function renderPhotoAddList() {
        var list = document.getElementById('photo-add-upload-list');
        var photos = getPhotoList();
        if (!list) {
            return;
        }
        list.innerHTML = '';
        if (!photos.length) {
            var empty = document.createElement('div');
            empty.className = 'photo-empty';
            empty.textContent = '暂无照片，请点击“上传照片”。';
            list.appendChild(empty);
            return;
        }
        for (var i = 0; i < photos.length; i++) {
            var item = document.createElement('div');
            item.className = 'photo-upload-item';
            var image = document.createElement('img');
            image.src = photos[i].src;
            image.alt = photos[i].name;
            var meta = document.createElement('div');
            var name = document.createElement('strong');
            var time = document.createElement('span');
            var location = document.createElement('em');
            name.textContent = photos[i].name;
            time.textContent = '拍摄时间：' + photos[i].time;
            location.textContent = '实时地点：' + photos[i].location;
            meta.appendChild(name);
            meta.appendChild(time);
            meta.appendChild(location);
            var deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.textContent = '删除';
            deleteButton.setAttribute('data-photo-index', i);
            deleteButton.addEventListener('click', function() {
                deleteUploadedPhoto(Number(this.getAttribute('data-photo-index')));
            });
            item.appendChild(image);
            item.appendChild(meta);
            item.appendChild(deleteButton);
            list.appendChild(item);
        }
    }

    function renderPhotoDetailGallery() {
        var usedGallery = document.getElementById('photo-used-list');
        var unusedGallery = document.getElementById('photo-unused-list');
        var photos = getPhotoList();
        if (!usedGallery || !unusedGallery) {
            return;
        }
        usedGallery.innerHTML = '';
        unusedGallery.innerHTML = '';
        var usedCount = 0;
        var unusedCount = 0;
        for (var i = 0; i < photos.length; i++) {
            var isUsed = typeof photoUsageDraft[i] === 'boolean' ? photoUsageDraft[i] : Boolean(photos[i].used);
            if (isUsed) {
                appendPhotoUsageItem(usedGallery, photos[i], i, true);
                usedCount++;
            } else {
                appendPhotoUsageItem(unusedGallery, photos[i], i, false);
                unusedCount++;
            }
        }
        if (!usedCount) {
            var empty = document.createElement('div');
            empty.className = 'photo-empty';
            empty.textContent = '暂无已使用照片。';
            usedGallery.appendChild(empty);
        }
        if (!unusedCount) {
            var unusedEmpty = document.createElement('div');
            unusedEmpty.className = 'photo-empty';
            unusedEmpty.textContent = '暂无未使用照片。';
            unusedGallery.appendChild(unusedEmpty);
        }
        setPhotoPreviewText('photo-used-count', usedCount);
        setPhotoPreviewText('photo-unused-count', unusedCount);
    }

    function appendPhotoUsageItem(gallery, photo, index, isUsed) {
        var figure = document.createElement('figure');
        figure.className = 'photo-detail-item';
        var image = document.createElement('img');
        image.src = photo.src;
        image.alt = photo.name;
        var caption = document.createElement('figcaption');
        var name = document.createElement('strong');
        var details = document.createElement('span');
        var moveButton = document.createElement('button');
        name.textContent = photo.name;
        details.textContent = photo.time + ' · ' + photo.location;
        moveButton.type = 'button';
        moveButton.className = 'photo-usage-move-btn';
        moveButton.textContent = isUsed ? '移至未使用' : '设为已使用';
        moveButton.setAttribute('data-photo-index', index);
        moveButton.addEventListener('click', function() {
            togglePhotoUsage(Number(this.getAttribute('data-photo-index')));
        });
        caption.appendChild(name);
        caption.appendChild(details);
        caption.appendChild(moveButton);
        figure.appendChild(image);
        figure.appendChild(caption);
        gallery.appendChild(figure);
    }

    window.togglePhotoUsage = function(index) {
        var photos = getPhotoList();
        if (index < 0 || index >= photos.length) {
            return;
        }
        var currentValue = typeof photoUsageDraft[index] === 'boolean'
            ? photoUsageDraft[index]
            : Boolean(photos[index].used);
        photoUsageDraft[index] = !currentValue;
        renderPhotoDetailGallery();
    };

    window.savePhotoDetailUsage = function() {
        var photos = getPhotoList();
        for (var i = 0; i < photos.length; i++) {
            if (typeof photoUsageDraft[i] === 'boolean') {
                photos[i].used = photoUsageDraft[i];
            }
        }
        showClientToast('图片使用状态保存成功');
        window.closePhotoDetailModal();
    };

    function ensurePhotoLibraryRow(context) {
        var tableBody = document.querySelector('#photo-library .photo-table tbody');
        if (!tableBody || !context) {
            return;
        }
        var buttons = tableBody.querySelectorAll('.photo-detail-btn[data-client]');
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].getAttribute('data-client') === context.client &&
                (buttons[i].getAttribute('data-project-date') || '') === (context.projectDate || '')) {
                return;
            }
        }
        var row = document.createElement('tr');
        var clientCell = document.createElement('td');
        var managerCell = document.createElement('td');
        var stageCell = document.createElement('td');
        var actionCell = document.createElement('td');
        var button = document.createElement('button');
        clientCell.textContent = context.client;
        managerCell.textContent = context.manager || '--';
        stageCell.textContent = context.projectDate ? context.stage + '（' + context.projectDate + '）' : context.stage;
        button.className = 'photo-detail-btn';
        button.type = 'button';
        button.textContent = '图片详情';
        button.setAttribute('data-client', context.client);
        button.setAttribute('data-manager', context.manager || '--');
        button.setAttribute('data-stage', context.stage);
        button.setAttribute('data-project-date', context.projectDate || '');
        bindPhotoDetailButton(button);
        actionCell.appendChild(button);
        row.appendChild(clientCell);
        row.appendChild(managerCell);
        row.appendChild(stageCell);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    }

    window.deleteUploadedPhoto = function(index) {
        var photos = getPhotoList();
        if (index >= 0 && index < photos.length) {
            photos.splice(index, 1);
        }
        renderPhotoAddList();
        renderPhotoDetailGallery();
    };

    window.closePhotoDetailModal = function() {
        var modal = document.getElementById('photo-detail-modal');
        if (modal) {
            modal.classList.remove('show');
        }
        photoUsageDraft = [];
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
        creditCode: '911101085996989854',
        currentStageIndex: 2,
        stages: [
            { key: 'enterprise', label: '企业信息', time: '2025-06-10', operator: '董瑾', status: '已完成' },
            { key: 'initiation', label: '立项', time: '2025-06-11', operator: '董瑾', status: '已完成' },
            { key: 'investigation', label: '尽调', time: '2025-06-15', operator: '张伟', status: '进行中' },
            { key: 'contract', label: '合同', time: '--', operator: '--', status: '待处理' },
            { key: 'loan', label: '放款', time: '--', operator: '--', status: '待处理' },
            { key: 'repayment', label: '还款', time: '--', operator: '--', status: '待处理' }
        ]
    },
    'E2025061100003': {
        companyName: '浙江臻善科技股份有限公司',
        creditCode: '91330110736036137L',
        currentStageIndex: 1,
        stages: [
            { key: 'enterprise', label: '企业信息', time: '2025-06-09', operator: '董瑾', status: '已完成' },
            { key: 'initiation', label: '立项', time: '--', operator: '董瑾', status: '进行中' },
            { key: 'investigation', label: '尽调', time: '--', operator: '--', status: '待处理' },
            { key: 'contract', label: '合同', time: '--', operator: '--', status: '待处理' },
            { key: 'loan', label: '放款', time: '--', operator: '--', status: '待处理' },
            { key: 'repayment', label: '还款', time: '--', operator: '--', status: '待处理' }
        ]
    }
};

function createAdvancedStageRecord(companyName, creditCode, currentStageIndex) {
    var labels = [
        { key: 'enterprise', label: '企业信息' },
        { key: 'initiation', label: '立项' },
        { key: 'investigation', label: '尽调' },
        { key: 'contract', label: '合同' },
        { key: 'loan', label: '放款' },
        { key: 'repayment', label: '还款' }
    ];
    var stages = [];
    for (var i = 0; i < labels.length; i++) {
        stages.push({
            key: labels[i].key,
            label: labels[i].label,
            time: i <= currentStageIndex ? ['2026-03-01', '2026-03-11', '2026-03-20', '2026-03-27', '2026-03-31', '2026-04-08'][i] : '--',
            operator: i <= currentStageIndex ? (i < 3 ? '董瑾' : '单士博') : '--',
            status: i < currentStageIndex ? '已完成' : (i === currentStageIndex ? '进行中' : '待处理')
        });
    }
    return {
        companyName: companyName,
        creditCode: creditCode,
        currentStageIndex: currentStageIndex,
        stages: stages
    };
}

stageData.E2026032700004 = createAdvancedStageRecord('济南联合百川园区运营有限公司', '91370100MA3N8X6P2Q', 3);
stageData.E2026033100005 = createAdvancedStageRecord('商河县产业投资开发集团有限公司', '91370126MA3R7X8K5M', 4);
stageData.E2026040800006 = createAdvancedStageRecord('济南金控产业发展有限公司', '91370100MA3Q6Y9L8N', 5);
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

    configureStageNavigation(data.currentStageIndex);

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

    switchStage(data.currentStageIndex);
};

function configureStageNavigation(currentStageIndex) {
    var navItems = document.querySelectorAll('.stage-nav-item');

    for (var i = 0; i < navItems.length; i++) {
        var item = navItems[i];
        var itemIndex = parseInt(item.getAttribute('data-stage-index'), 10);
        var isFutureStage = itemIndex > currentStageIndex;

        item.hidden = isFutureStage;
        item.disabled = isFutureStage;
        item.classList.remove('active');
        item.classList.toggle('current-stage', itemIndex === currentStageIndex);
        item.classList.toggle('last-visible', itemIndex === currentStageIndex);

        if (itemIndex === currentStageIndex) {
            item.setAttribute('aria-current', 'step');
        } else {
            item.removeAttribute('aria-current');
        }
    }
}

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
        stageIndex = parseInt(stageIndex, 10);
        if (!data || isNaN(stageIndex) || stageIndex < 0 || stageIndex > data.currentStageIndex) {
            return;
        }

        var stage = data.stages[stageIndex];
        if (!stage) { return; }

        var navItems = document.querySelectorAll('.stage-nav-item');

        for (var i = 0; i < navItems.length; i++) {
            var navItem = navItems[i];
            var navIndex = parseInt(navItem.getAttribute('data-stage-index'), 10);
            navItem.classList.remove('active');
            var dot = navItem.querySelector('.stage-dot');
            if (dot) {
                dot.classList.remove('active');
                dot.classList.remove('completed');
                if (navIndex < data.currentStageIndex) {
                    dot.classList.add('completed');
                } else if (navIndex === data.currentStageIndex) {
                    dot.classList.add('active');
                }
            }
        }

        var targetNav = document.querySelector('.stage-nav-item[data-stage-index="' + stageIndex + '"]');
        if (targetNav) {
            targetNav.classList.add('active');
        }

        renderStageFields(data, stage);

        var currentStage = data.stages[data.currentStageIndex];
        var currentLabel = document.getElementById('stage-current-label');
        if (currentLabel && currentStage) {
            currentLabel.textContent = '当前阶段：' + currentStage.label;
        }

        setText('stage-phase-tag', stage.label);
        setText('stage-process-title', stage.label === '企业信息' ? '企业信息' : stage.label + '信息');
    };

    function renderStageFields(data, stage) {
        var target = document.getElementById('stage-project-info');
        if (!target) { return; }

        activateStageInfoPanel();

        var source = null;
        if (stage.key === 'initiation') {
            source = document.getElementById('project-info-panel');
        } else if (stage.key === 'investigation') {
            source = document.getElementById('project');
        } else if (stage.key === 'loan') {
            source = document.getElementById('loan-project');
        } else if (stage.key === 'contract') {
            renderContractStage(target, data, stage);
            return;
        } else if (stage.key === 'repayment') {
            renderRepaymentStage(target, data, stage);
            return;
        }

        if (source) {
            var clone = source.cloneNode(true);
            hydrateStageTemplate(clone, data, stage);
            sanitizeStageTemplate(clone);
            target.innerHTML = '';
            while (clone.firstChild) {
                target.appendChild(clone.firstChild);
            }
            target.classList.add('stage-rich-content');
            return;
        }

        target.classList.remove('stage-rich-content');
        target.innerHTML = '<section class="stage-shot-card"><h3 class="stage-shot-section-title" id="stage-process-title"></h3><div class="stage-shot-form" id="stage-simple-form"></div></section>';
        var form = document.getElementById('stage-simple-form');
        var amount = currentStageClientId === 'E2025061100001' ? '50,000,000.00 元' : '30,000,000.00 元';
        var fieldsByStage = {
            enterprise: [
                ['企业名称', data.companyName],
                ['统一社会信用代码', data.creditCode],
                ['客户号', currentStageClientId],
                ['企业类型', '股份有限公司'],
                ['注册地址', data.companyName.indexOf('北京') === 0 ? '北京市海淀区' : '浙江省杭州市'],
                ['经营状态', '正常']
            ],
            initiation: [
                ['项目名称', data.companyName],
                ['业务品种', '小额贷款'],
                ['立项时间', stage.time],
                ['申请金额', amount],
                ['负责部门', '业务部'],
                ['主办业务经理', '董瑾']
            ],
            investigation: [
                ['尽调时间', stage.time],
                ['检查方式', '非现场'],
                ['主担保方式', '保证'],
                ['详细担保方式', '企业保证'],
                ['投放行业', '信息技术服务业'],
                ['企业规模', '中型企业'],
                ['是否涉农', '否'],
                ['尽调报告', '尽调报告.pdf']
            ],
            contract: [
                ['合同编号', '--'],
                ['签订日期', stage.time],
                ['合同金额', amount],
                ['合同期限', '--'],
                ['担保方式', '--'],
                ['经办人', stage.operator]
            ],
            loan: [
                ['借据号', '--'],
                ['放款日期', stage.time],
                ['放款金额', amount],
                ['到期日期', '--'],
                ['执行年利率', '--'],
                ['经办人', stage.operator]
            ],
            repayment: [
                ['借据号', '--'],
                ['还款日期', stage.time],
                ['应还本金', '--'],
                ['应还利息', '--'],
                ['实还金额', '--'],
                ['剩余本金', '--']
            ]
        };
        var fields = fieldsByStage[stage.key] || [];
        fields.push(['环节状态', stage.status]);

        form.innerHTML = '';
        for (var i = 0; i < fields.length; i++) {
            var field = document.createElement('label');
            var label = document.createElement('span');
            var input = document.createElement('input');

            field.className = 'stage-shot-field';
            label.textContent = fields[i][0];
            input.type = 'text';
            input.value = fields[i][1];
            input.readOnly = true;

            field.appendChild(label);
            field.appendChild(input);
            form.appendChild(field);
        }
    }

    function activateStageInfoPanel() {
        var tabs = document.querySelectorAll('#stage-detail-page .stage-tab');
        var panels = document.querySelectorAll('#stage-detail-page .stage-tab-content');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.toggle('active', tabs[i].getAttribute('data-stage-panel') === 'stage-project-info');
        }
        for (var j = 0; j < panels.length; j++) {
            panels[j].classList.toggle('active', panels[j].id === 'stage-project-info');
        }
    }

    function sanitizeStageTemplate(container) {
        var idNodes = container.querySelectorAll('[id]');
        var namedNodes = container.querySelectorAll('[name]');
        for (var i = 0; i < idNodes.length; i++) {
            idNodes[i].removeAttribute('id');
        }
        for (var j = 0; j < namedNodes.length; j++) {
            namedNodes[j].setAttribute('name', 'stage-' + namedNodes[j].getAttribute('name'));
        }
    }

    function hydrateStageTemplate(container, data, stage) {
        if (stage.key === 'initiation') {
            hydrateInitiationTemplate(container, data, stage);
        } else if (stage.key === 'investigation') {
            hydrateInvestigationTemplate(container, data, stage);
        } else if (stage.key === 'loan') {
            hydrateLoanTemplate(container, data, stage);
        }
    }

    function hydrateInitiationTemplate(container, data, stage) {
        var amount = currentStageClientId === 'E2025061100001' ? '50,000,000.00' : '30,000,000.00';
        setStageTemplateField(container, '项目名称', data.companyName);
        setStageTemplateField(container, '初次接洽时间', '2026-02-26');
        setStageTemplateField(container, '意向金额', amount);
        setStageTemplateField(container, '资金用途', '经营周转');
        setStageTemplateField(container, '立项时间', stage.time === '--' ? '2026-03-11 09:00:00' : stage.time + ' 09:00:00');
        setStageTemplateField(container, '客户类型', '首次合作客户');
        setStageTemplateField(container, '业务类型', '贷款');
        setStageTemplateField(container, '还款来源', '经营回款');

        var locationField = findStageTemplateField(container, '客户地点');
        if (locationField) {
            var locationSelect = locationField.querySelector('select');
            var locationInput = locationField.querySelector('input');
            setSelectValue(locationSelect, data.companyName.indexOf('北京') === 0 ? '北京市 / 北京市 / 海淀区' : '浙江省 / 杭州市 / 西湖区');
            if (locationInput) {
                locationInput.value = data.companyName.indexOf('北京') === 0 ? '北京市海淀区中关村科技园' : '浙江省杭州市西湖区科技园';
            }
        }

        var reportField = findStageTemplateField(container, '立项报告');
        if (reportField) {
            reportField.classList.add('required');
            var reportRadios = reportField.querySelectorAll('input[type="radio"]');
            if (reportRadios[0]) { reportRadios[0].checked = false; }
            if (reportRadios[1]) { reportRadios[1].checked = true; }
            var reportUpload = reportField.querySelector('.project-upload-line');
            if (reportUpload) { reportUpload.style.display = 'none'; }
        }

        var description = findStageTemplateField(container, '项目简介');
        var textarea = description ? description.querySelector('textarea') : null;
        if (textarea) {
            textarea.value = data.companyName + '经营情况稳定，本次融资主要用于补充企业日常经营周转资金。项目主体资信良好，业务模式清晰，还款来源为经营回款。';
        }

        setStageFileChips(container, '其他资料', [
            '借款人联合百川决议.png',
            '担保人企业资料.pdf',
            '借款人企业资料.pdf',
            '投保证担保决议1.png',
            '投质押担保决议1.png',
            '投保证担保决议2.png'
        ]);
    }

    function hydrateInvestigationTemplate(container, data, stage) {
        setStageTemplateField(container, '尽调时间', stage.time === '--' ? '2026-03-02 09:00:00' : stage.time + ' 09:00:00');
        setStageTemplateField(container, '详细担保方式', '质押、保证');
        setStageTemplateField(container, '主担保方式', '质押');
        setStageTemplateField(container, '投放行业', '租赁和商务服务业 / 商务服务业 / 综合管理服务');
        setStageTemplateField(container, '企业规模', '小型');
        setStageTemplateField(container, '是否涉农', '是');
        setStageTemplateField(container, '业务模式', '授信');
        setStageTemplateField(container, '上年末总资产', '698,012,600.00');
        setStageTemplateField(container, '上年末纳税总额', '6,213,600.00');
        setStageTemplateField(container, '上年末净资产', '216,739,900.00');
        setStageTemplateField(container, '上年营业收入', '51,612,600.00');
        setStageTemplateField(container, '上年净利润', '2,069,400.00');
        setStageTemplateField(container, '预授信金额', '23,000,000.00');
        setStageTemplateField(container, '授信利率', '6.98');
        setStageTemplateField(container, '授信期限', '24');
        setStageTemplateField(container, '资金用途', '经营周转');
        setStageTemplateField(container, '是否董事长审批', '是');

        setStageFileChips(container, '尽调报告', [data.companyName + '调查报告.pdf']);
        setStageFileChips(container, '征信情况', ['企业征信报告.pdf', '联合百川征信报告.pdf']);
        setStageFileChips(container, '其他资料', [
            '借款人联合百川决议.png',
            '担保人企业资料.pdf',
            '借款人企业资料.pdf',
            '投保证担保决议1.png',
            '投质押担保决议1.png',
            '投保证担保决议2.png'
        ]);

        hydrateInvestigationTables(container);
        hydrateInvestigationOpinions(container, data);
    }

    function renderContractStage(target, data, stage) {
        target.classList.add('stage-rich-content');
        target.innerHTML =
            '<section class="stage-contract-section">' +
                '<h3 class="stage-contract-title">合同信息</h3>' +
                '<div class="stage-contract-grid">' +
                    stageContractField('合同号', 'S（2026）额度借第009号-01', true) +
                    stageContractAmountField('合同总额', '23,000,000.00', '贰仟叁佰万元整', true) +
                    '<div class="stage-contract-field required"><span>结算周期</span><div class="stage-contract-radio"><label><input type="radio" checked>自然月</label><label><input type="radio">标准月</label></div></div>' +
                    stageContractField('合同起始日', stage.time, true) +
                    stageContractField('合同到期日', '2028-03-27', true) +
                    stageContractUnitField('合同期限', '731', '天', false) +
                    stageContractUnitField('年利率', '6.98', '%', true) +
                    stageContractUnitField('月利率', '5.820000', '‰', false) +
                    stageContractField('还款方式', '按月付息，到期一次性还本', true) +
                    '<div class="stage-contract-field required"><span>罚息费率</span><div class="stage-contract-composite"><b>按比例上浮</b><b>100.00 %</b><em>计</em><b>13.96 %</b></div></div>' +
                    '<div class="stage-contract-field required"><span>罚息类型</span><div class="stage-contract-radio"><label><input type="radio" checked>按应收本息合计收取</label><label><input type="radio">按本金收取</label></div></div>' +
                    '<div class="stage-contract-field"><span>收息方式</span><div class="stage-contract-radio"><label><input type="radio" checked>按单利收取</label><label><input type="radio">按复利收取</label></div></div>' +
                    '<div class="stage-contract-field required"><span>额度类型</span><div class="stage-contract-radio"><label><input type="radio">非循环</label><label><input type="radio" checked>循环</label></div></div>' +
                    stageContractAmountField('合同余额', '10,000,000.00', '壹仟万元整', false) +
                    '<div class="stage-contract-field stage-contract-files"><span>其他资料</span>' + buildStageFileMarkup([
                        '借款人联合百川决议.png', '担保人企业资料.pdf', '借款人企业资料.pdf',
                        '投保证担保决议1.png', '投质押担保决议1.png', '投保证担保决议2.png'
                    ]) + '</div>' +
                '</div>' +
            '</section>';
    }

    function stageContractField(label, value, required) {
        return '<label class="stage-contract-field' + (required ? ' required' : '') + '"><span>' + label + '</span><input type="text" value="' + value + '" readonly></label>';
    }

    function stageContractUnitField(label, value, unit, required) {
        return '<label class="stage-contract-field' + (required ? ' required' : '') + '"><span>' + label + '</span><div class="stage-contract-unit"><input type="text" value="' + value + '" readonly><em>' + unit + '</em></div></label>';
    }

    function stageContractAmountField(label, value, uppercase, required) {
        return '<div class="stage-contract-field' + (required ? ' required' : '') + '"><span>' + label + '</span><div class="stage-contract-amount"><div class="stage-contract-unit"><input type="text" value="' + value + '" readonly><em>元</em></div><b>大写：' + uppercase + '</b></div></div>';
    }

    function buildStageFileMarkup(fileNames) {
        var html = '<div class="stage-file-list">';
        for (var i = 0; i < fileNames.length; i++) {
            html += '<span class="stage-file-chip">⌕ ' + fileNames[i] + '</span>';
        }
        return html + '<button class="stage-file-download" type="button" aria-label="下载附件">↓</button></div>';
    }

    function hydrateLoanTemplate(container, data, stage) {
        var sections = container.querySelectorAll('.loan-section');
        for (var i = sections.length - 1; i >= 0; i--) {
            var title = sections[i].querySelector('.loan-section-title');
            var titleText = title ? title.textContent.trim() : '';
            if (titleText === '底层资产' || titleText === '增信措施') {
                sections[i].parentNode.removeChild(sections[i]);
            } else if (titleText === '放款信息') {
                title.textContent = '放款信息-1';
            }
        }

        var infoTables = container.querySelectorAll('.loan-info-table');
        if (infoTables[0]) {
            infoTables[0].querySelector('tbody').innerHTML =
                '<tr><th>借据号</th><td>J济金控小贷(2026)额度借第009号-01</td><th>放款日期</th><td>' + stage.time + '</td><th>到期日期</th><td>2027-03-30</td><th>借款天数</th><td>364 天</td></tr>' +
                '<tr><th>放款金额</th><td>13,000,000.00 元</td><th>年利率</th><td>6.98 %</td><th>罚息率</th><td>13.96 %</td><th>结息日</th><td>8</td></tr>' +
                '<tr><th>结息日计息方式</th><td>下期收取</td><th>放款余额</th><td>13,000,000.00 元</td><th>是否结清</th><td>未结清</td><th>放款条件</th><td>——</td></tr>' +
                '<tr><th colspan="2">是否董事长审批</th><td colspan="6">是</td></tr>' +
                '<tr><th colspan="2">合同、协议、借据、支用申请书等</th><td colspan="6">暂无附件~</td></tr>' +
                '<tr><th colspan="2">企业章程、决议</th><td colspan="6">暂无附件~</td></tr>' +
                '<tr><th colspan="2">公司内部决策文件</th><td colspan="6">暂无附件~</td></tr>' +
                '<tr><th colspan="2">外部信息查询</th><td colspan="6">暂无附件~</td></tr>' +
                '<tr><th colspan="2">其他</th><td colspan="6">' + buildStageFileMarkup([
                    '最高额保证合同.pdf', '开户资料.jpg', '用款申请书.jpg', '借款人联合百川决议.png',
                    '客户告知书.pdf', '质押登记.jpg', '企业征信.pdf', '放款前资料审查确认单.pdf'
                ]) + '</td></tr>';
        }

        if (infoTables[1]) {
            infoTables[1].querySelector('tbody').innerHTML =
                '<tr><th>收款人姓名</th><td>' + data.companyName + '</td><th>收款人开户行</th><td>中国农业银行股份有限公司商河县支行</td><th>收款人账户</th><td>15150101040020152</td><th>是否转介</th><td>公司转介</td></tr>' +
                '<tr><th>款项性质</th><td>——</td><th colspan="2">放款依据</th><td colspan="4">——</td></tr>' +
                '<tr><th>联行号</th><td>——</td><th>申请部门</th><td>业务部</td><th>还款人账号</th><td>15150101040020152</td><th>还款人开户行</th><td>中国农业银行股份有限公司商河县支行</td></tr>' +
                '<tr><th>主办名称</th><td>单士博</td><th>主办比例</th><td>35.00 %</td><th>主管名称</th><td>黄冠</td><th>主管比例</th><td>30.00 %</td></tr>' +
                '<tr><th>审批经理</th><td>曾凯</td><th>风控经理</th><td>刁鹏</td><th>协办名称</th><td>宋波</td><th>协办比例</th><td>35.00 %</td></tr>';
        }

        var tools = container.querySelectorAll('.loan-section-tools button');
        if (tools[1]) {
            tools[1].setAttribute('onclick', 'openStageRepaymentPlanPage()');
        }

        var opinion = container.querySelector('.loan-opinion-row');
        if (opinion) {
            var person = opinion.querySelector('.loan-opinion-person span:last-child');
            var content = opinion.querySelector('.loan-opinion-content');
            var time = opinion.querySelector('.loan-opinion-time');
            if (person) { person.textContent = '信贷二部/单士博'; }
            if (content) { content.innerHTML = '<p>同意放款</p><p>暂无附件~</p>'; }
            if (time) { time.textContent = '2026-03-31 14:26:12'; }
            var second = opinion.cloneNode(true);
            var secondPerson = second.querySelector('.loan-opinion-person span:last-child');
            var secondTime = second.querySelector('.loan-opinion-time');
            if (secondPerson) { secondPerson.textContent = '信贷一部/黄冠'; }
            if (secondTime) { secondTime.textContent = '2026-03-31 14:28:04'; }
            opinion.parentNode.appendChild(second);
        }
    }

    function renderRepaymentStage(target, data, stage) {
        target.classList.add('stage-rich-content');
        target.innerHTML =
            '<section class="stage-repayment-section">' +
                '<div class="stage-repayment-heading"><h3>J济金控小贷(2026)额度借第009号-01-还款信息</h3><div><button type="button" onclick="openStageRepaymentPlanPage()">▣ 还款计划</button><button type="button">折叠</button></div></div>' +
                '<table class="stage-repayment-info-table"><tbody>' +
                    '<tr><th>借据号</th><td>J济金控小贷(2026)额度借第009号-01</td><th>放款金额</th><td>13,000,000.00 元</td><th>当前期次</th><td>1 / 13</td></tr>' +
                    '<tr><th>计划还款日期</th><td>' + stage.time + '</td><th>实际还款日期</th><td>' + stage.time + '</td><th>还款类型</th><td>正常还款</td></tr>' +
                    '<tr><th>还款金额</th><td>20,164.44 元</td><th>包含本金</th><td>0.00 元</td><th>包含利息</th><td>20,164.44 元</td></tr>' +
                    '<tr><th>实收罚息金额</th><td colspan="5">0.00 元</td></tr>' +
                    '<tr><th>减免罚息原因</th><td colspan="5">——<br>暂无附件~</td></tr>' +
                    '<tr><th>备注</th><td colspan="5">——</td></tr>' +
                '</tbody></table>' +
                '<div class="stage-repayment-opinion"><h3>还款审批意见</h3>' +
                    stageRepaymentOpinion('信贷二部/单士博', '暂无附件~') +
                    stageRepaymentOpinion('信贷一部/黄冠', '请审批<br>暂无附件~') +
                    stageRepaymentOpinion('济南金控小额贷款有限公司/高妙馨', '请审核<br>暂无附件~') +
                    stageRepaymentOpinion('济南金控小额贷款有限公司/陈城成', '暂无附件~') +
                '</div>' +
            '</section>';
    }

    function stageRepaymentOpinion(person, content) {
        return '<div class="stage-repayment-opinion-row"><div><span class="comment-avatar success">✓</span>' + person + '</div><p>' + content + '</p></div>';
    }

    window.openStageRepaymentPlanPage = function() {
        var page = document.getElementById('stage-repayment-plan-page');
        var body = document.getElementById('stage-plan-detail-body');
        var clientName = document.getElementById('stage-plan-client-name');
        var data = stageData[currentStageClientId];
        if (clientName && data) {
            clientName.textContent = data.companyName;
        }
        if (body) {
            body.innerHTML = buildStageRepaymentPlanRows();
        }
        if (page) {
            page.classList.add('show');
        }
    };

    window.closeStageRepaymentPlanPage = function() {
        var page = document.getElementById('stage-repayment-plan-page');
        if (page) {
            page.classList.remove('show');
        }
    };

    function buildStageRepaymentPlanRows() {
        var dates = ['2026-04-08', '2026-05-08', '2026-06-08', '2026-07-08', '2026-08-08', '2026-09-08', '2026-10-08', '2026-11-08', '2026-12-08', '2027-01-08', '2027-02-08', '2027-03-08', '2027-03-30'];
        var interests = ['20,164.44', '75,616.67', '78,137.22', '75,616.67', '78,137.22', '78,137.22', '75,616.67', '78,137.22', '75,616.67', '78,137.22', '78,137.22', '70,573.33', '57,386.67'];
        var html = '';
        for (var i = 0; i < dates.length; i++) {
            var settled = i < 3;
            var approving = i === 3;
            var status = settled ? '已结清' : (approving ? '审批中' : '未结清');
            var actualDate = settled ? dates[i] : '——';
            var receivedInterest = settled ? interests[i] : '0.00';
            var receivedTotal = settled ? interests[i] : (approving ? '0.00' : '——');
            html += '<tr>' +
                '<td>' + (i + 1) + '</td><td>' + dates[i] + '</td><td>' + actualDate + '</td><td>' + status + '</td>' +
                '<td>' + (i === dates.length - 1 ? '13,000,000.00' : '0.00') + '</td><td>' + (settled ? '0.00' : '——') + '</td>' +
                '<td>' + interests[i] + '</td><td>' + receivedInterest + '</td><td>0.00</td><td>0.00</td><td>' + (settled || approving ? '0.00' : '——') + '</td><td>' + (settled || approving ? '0.00' : '——') + '</td><td>' + receivedTotal + '</td><td>' + (settled || approving ? '0.00' : '——') + '</td>' +
            '</tr>';
        }
        return html;
    }

    function findStageTemplateField(container, labelText) {
        var fields = container.querySelectorAll('.project-field, .credit-field');
        for (var i = 0; i < fields.length; i++) {
            var children = fields[i].children;
            for (var j = 0; j < children.length; j++) {
                if (children[j].tagName === 'SPAN' && children[j].textContent.trim() === labelText) {
                    return fields[i];
                }
            }
        }
        return null;
    }

    function setStageTemplateField(container, labelText, value) {
        var field = findStageTemplateField(container, labelText);
        if (!field) { return; }
        var select = field.querySelector('select');
        var textarea = field.querySelector('textarea');
        var input = field.querySelector('input[type="text"]');
        if (select) {
            setSelectValue(select, value);
        } else if (textarea) {
            textarea.value = value;
        } else if (input) {
            input.value = value;
        }
    }

    function setSelectValue(select, value) {
        if (!select) { return; }
        select.innerHTML = '';
        var option = document.createElement('option');
        option.textContent = value;
        option.value = value;
        select.appendChild(option);
    }

    function setStageFileChips(container, labelText, fileNames) {
        var field = findStageTemplateField(container, labelText);
        if (!field) { return; }
        var fileArea = field.querySelector('.credit-file-row, .credit-empty-file, .project-upload-line');
        if (!fileArea) { return; }
        fileArea.className = 'stage-file-list';
        fileArea.innerHTML = '';
        for (var i = 0; i < fileNames.length; i++) {
            var chip = document.createElement('span');
            chip.className = 'stage-file-chip';
            chip.textContent = '⌕ ' + fileNames[i];
            fileArea.appendChild(chip);
        }
        var download = document.createElement('button');
        download.className = 'stage-file-download';
        download.type = 'button';
        download.textContent = '↓';
        download.setAttribute('aria-label', '下载附件');
        fileArea.appendChild(download);
    }

    function findCreditSection(container, titleText) {
        var sections = container.querySelectorAll('.credit-section');
        for (var i = 0; i < sections.length; i++) {
            var title = sections[i].querySelector('.credit-section-title');
            if (title && title.textContent.trim() === titleText) {
                return sections[i];
            }
        }
        return null;
    }

    function hydrateInvestigationTables(container) {
        var addButtons = container.querySelectorAll('.credit-section .table-add-btn');
        for (var i = 0; i < addButtons.length; i++) {
            var actionHeader = addButtons[i].closest('th');
            if (actionHeader && actionHeader.parentNode) {
                actionHeader.parentNode.removeChild(actionHeader);
            }
        }

        var assetSection = findCreditSection(container, '底层资产');
        var assetTables = assetSection ? assetSection.querySelectorAll('table') : [];
        if (assetTables[0]) {
            assetTables[0].querySelector('tbody').innerHTML =
                '<tr><td>1</td><td><button class="stage-table-detail-link" type="button" onclick="openAssetDetail(\'mortgage\')">房产</button></td><td>91370126MA3R7X8K5M</td><td>鲁（2026）商河县不动产权第001028号</td><td>商河县产业投资开发集团有限公司</td></tr>';
        }
        if (assetTables[1]) {
            assetTables[1].querySelector('tbody').innerHTML =
                '<tr><td>1</td><td>股权</td><td><button class="stage-table-detail-link" type="button" onclick="openAssetDetail(\'pledge\')">产业投资集团持有的1000万股股权</button></td><td>10,000,000.00</td><td>产业投资集团有限公司</td><td>ZY20260302001</td></tr>' +
                '<tr><td>2</td><td>股权</td><td><button class="stage-table-detail-link" type="button" onclick="openAssetDetail(\'pledge\')">产业投资集团持有的2300万股股权</button></td><td>23,000,000.00</td><td>产业投资集团有限公司</td><td>ZY20260302002</td></tr>';
        }

        var guaranteeSection = findCreditSection(container, '增信措施');
        var guaranteeTables = guaranteeSection ? guaranteeSection.querySelectorAll('table') : [];
        if (guaranteeTables[0]) {
            guaranteeTables[0].querySelector('tbody').innerHTML =
                '<tr><td>1</td><td><button class="stage-table-detail-link" type="button" onclick="openAssetDetail(\'guarantor\')">昌晋升</button></td><td>370126198111091216</td><td>44</td><td>15908843351</td></tr>';
        }
        if (guaranteeTables[1]) {
            guaranteeTables[1].querySelector('tbody').innerHTML =
                '<tr><td>1</td><td><button class="stage-table-detail-link" type="button" onclick="openAssetDetail(\'guarantee\')">商河县产业投资开发集团有限公司</button></td><td>91370126798891104N</td><td>25,000,000.00</td><td>提供连带责任保证</td></tr>';
        }
    }

    function getAssetDetailConfig(type) {
        var configs = {
            mortgage: {
                title: '查看抵押物',
                sectionTitle: '抵押物完整信息',
                fields: [
                    ['类别', '房产', true],
                    ['权利人类型', '企业', true],
                    ['权利人', '商河县产业投资开发集团有限公司', true],
                    ['权利人证件类型', '统一社会信用代码', false],
                    ['权利人证件号码', '91370126MA3R7X8K5M', false],
                    ['权利证号', '鲁（2026）商河县不动产权第001028号', true],
                    ['城市', '山东省 / 济南市 / 商河县', true],
                    ['坐落', '商河县产业园区创业大道6号', true],
                    ['面积（㎡）', '18,650.32', false],
                    ['预评估价值（元）', '32,000,000.00', false],
                    ['抵押开始时间', '2026-07-10', false],
                    ['抵押结束时间', '2028-07-10', false],
                    ['评估时间', '2026-07-08', false],
                    ['评估公司', '山东中评恒信资产评估有限公司', false],
                    ['是否一押', '是', false],
                    ['债权人', '济南金控小额贷款有限公司', false],
                    ['债权金额（元）', '25,000,000.00', false],
                    ['抵押企业情况', '经营正常，抵押手续齐全。', false, true]
                ],
                files: ['不动产权证.pdf', '抵押物现场照片.jpg', '资产评估报告.pdf']
            },
            pledge: {
                title: '查看质押物',
                sectionTitle: '质押物完整信息',
                fields: [
                    ['类别', '股权', true],
                    ['质押物描述', '产业投资集团持有的1000万股股权', false],
                    ['名称', '产业投资集团持有的1000万股股权', true],
                    ['评估公司', '山东中评恒信资产评估有限公司', false],
                    ['评估时间', '2026-07-08', false],
                    ['评估价值（元）', '10,000,000.00', true],
                    ['质押人类型', '企业', false],
                    ['质押人', '商河县产业投资开发集团有限公司', true],
                    ['质押人证件类型', '企业营业执照', false],
                    ['质押人证件号码', '91370126MA3R7X8K5M', false],
                    ['质押物数量', '1', false],
                    ['质押编号', 'ZY20260302001', false],
                    ['质押价值（元）', '10,000,000.00', false],
                    ['登记日期', '2026-07-13', false],
                    ['有效时间', '2026-07-10 至 2028-07-10', false],
                    ['备注', '质押登记资料完整，状态正常。', false, true]
                ],
                files: ['股权质押登记证明.jpg', '股权价值评估报告.pdf']
            },
            guarantor: {
                title: '查看担保人',
                sectionTitle: '担保人完整信息',
                fields: [
                    ['担保人姓名', '昌晋升', true],
                    ['身份证号', '370126198111091216', true],
                    ['年龄', '44', true],
                    ['与客户关系', '企业负责人', false],
                    ['联系方式', '15908843351', true],
                    ['联系地址', '山东省 / 济南市 / 商河县', true],
                    ['担保类型', '连带责任保证', false],
                    ['担保名称', '商河县产业投资开发集团有限公司', false],
                    ['职务', '董事长、党组织书记、法定代表人', false, true],
                    ['年收入（元）', '0.00', false],
                    ['家庭资产（元）', '0.00', false],
                    ['保证开始时间', '2026-07-10', false],
                    ['保证结束时间', '2028-07-10', false],
                    ['保证人类型', '自然人', false],
                    ['保证金额（元）', '25,000,000.00', false],
                    ['登记时间', '2026-07-10', false],
                    ['担保人描述', '个人信用状况良好，具备担保能力。', false, true],
                    ['备注', '资料已核验。', false, true]
                ],
                files: ['担保人身份证.pdf', '个人征信报告.pdf'],
                extraTitle: '固定资产',
                extraHeaders: ['类型', '购买时间', '估值（元）', '备注', '地址', '附件']
            },
            guarantee: {
                title: '查看担保',
                sectionTitle: '担保企业完整信息',
                fields: [
                    ['担保企业名称', '商河县产业投资开发集团有限公司', true],
                    ['统一社会信用代码', '91370126798891104N', true],
                    ['近一年收入（元）', '1,611,249,300.00', false],
                    ['担保价值（元）', '25,000,000.00', false],
                    ['所在位置', '山东省 / 济南市 / 商河县', false],
                    ['调查日期', '2026-07-08', false],
                    ['登记时间', '2026-07-10', false],
                    ['担保人类型', '企业', false],
                    ['保证金额（元）', '25,000,000.00', false],
                    ['保证开始时间', '2026-07-10', false],
                    ['保证结束时间', '2028-07-10', false],
                    ['担保描述', '为本项目提供连带责任保证担保。', false, true],
                    ['备注', '担保企业经营正常，担保资料完整。', false, true]
                ],
                files: ['担保企业营业执照.pdf', '担保决议.pdf', '企业征信报告.pdf'],
                extraTitle: '经营信息',
                extraHeaders: ['核验时间', '在投余额（元）', '月还款（元）', '到期时间']
            }
        };
        return configs[type] || null;
    }

    function buildAssetDetailMarkup(config) {
        var html = '<section class="asset-detail-section"><h3>' + config.sectionTitle + '</h3><div class="asset-detail-grid">';
        for (var i = 0; i < config.fields.length; i++) {
            var field = config.fields[i];
            html += '<div class="asset-detail-field' + (field[3] ? ' wide' : '') + '">' +
                '<span' + (field[2] ? ' class="required"' : '') + '>' + field[0] + '</span>' +
                '<div>' + field[1] + '</div></div>';
        }
        html += '</div></section>';

        if (config.extraTitle && config.extraHeaders) {
            html += '<section class="asset-detail-section"><h3>' + config.extraTitle + '</h3><div class="asset-detail-table-wrap"><table class="asset-detail-table"><thead><tr>';
            for (var j = 0; j < config.extraHeaders.length; j++) {
                html += '<th>' + config.extraHeaders[j] + '</th>';
            }
            html += '</tr></thead><tbody><tr><td colspan="' + config.extraHeaders.length + '">暂无数据</td></tr></tbody></table></div></section>';
        }

        html += '<section class="asset-detail-section"><h3>附件资料</h3><div class="asset-detail-files">';
        for (var k = 0; k < config.files.length; k++) {
            html += '<button type="button">⌕ ' + config.files[k] + '</button>';
        }
        html += '</div></section>';
        return html;
    }

    window.openAssetDetail = function(type) {
        var config = getAssetDetailConfig(type);
        var modal = document.getElementById('asset-detail-modal');
        var title = document.getElementById('asset-detail-title');
        var body = document.getElementById('asset-detail-body');
        if (!config || !modal || !title || !body) { return; }

        title.textContent = config.title;
        body.innerHTML = buildAssetDetailMarkup(config);
        body.scrollTop = 0;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    window.closeAssetDetail = function() {
        var modal = document.getElementById('asset-detail-modal');
        if (!modal) { return; }
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    function hydrateInvestigationOpinions(container, data) {
        var section = findCreditSection(container, '授信审批意见');
        var first = section ? section.querySelector('.credit-approval-opinion') : null;
        if (!first) { return; }
        var person = first.querySelector('.credit-opinion-person-cell span:last-child');
        var text = first.querySelector('.credit-opinion-text');
        var date = first.querySelector('.credit-opinion-date');
        if (person) { person.textContent = '信贷一部/单士博'; }
        if (text) {
            text.innerHTML = '<p>同意给予' + data.companyName + '授信额度2300万元，授信期限两年，资金用于经营周转。</p><p>暂无附件~</p>';
        }
        if (date) { date.textContent = '2026-03-31 09:25:57'; }

        var second = first.cloneNode(true);
        var secondDot = second.querySelector('.credit-check-dot');
        var secondPerson = second.querySelector('.credit-opinion-person-cell span:last-child');
        var secondText = second.querySelector('.credit-opinion-text');
        var secondDate = second.querySelector('.credit-opinion-date');
        if (secondDot) {
            secondDot.classList.add('rejected');
            secondDot.textContent = '×';
        }
        if (secondPerson) { secondPerson.textContent = '信贷一部/黄冠'; }
        if (secondText) { secondText.innerHTML = '<p>股权价值修改</p><p>暂无附件~</p>'; }
        if (secondDate) { secondDate.textContent = '2026-03-31 09:34:52'; }
        first.parentNode.appendChild(second);
    }
})();
