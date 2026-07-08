(function() {
    'use strict';
    var currentDetailSource = 'business-approval';

    document.addEventListener('DOMContentLoaded', function() {
        initTabs();
        initDetailTabs();
        initLoanDetailTabs();
        initChangeDetailTabs();
        initSidebarNav();
        initHandleButtons();
        initSearchFunction();
        initRadioButtons();
        initRemoveFile();
        initFormButtons();
        initPagedLists();
    });

    function initTabs() {
        var navItems = document.querySelectorAll('.nav-tabs .nav-item');
        var tabContents = document.querySelectorAll('.tab-content');

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
                    var loanDetailPage = document.getElementById('loan-detail-page');
                    var changeDetailPage = document.getElementById('change-detail-page');
                    var reportDetailPage = document.getElementById('report-detail-page');
                    if (detailPage) {
                        detailPage.classList.remove('show');
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
                    document.body.style.overflow = '';

                    var targetContent = document.getElementById(tabId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            })(i);
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
        var handleButtons = document.querySelectorAll('#business-approval .handle-btn:not(.change-approve-btn)');

        for (var i = 0; i < handleButtons.length; i++) {
            handleButtons[i].addEventListener('click', function(e) {
                e.preventDefault();
                var businessId = this.getAttribute('data-id');
                openDetailPage(businessId);
            });
        }
    }

    function openDetailPage(businessId) {
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var detailPage = document.getElementById('detail-page');
        currentDetailSource = 'business-approval';

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
        var navTabs = document.querySelector('.nav-tabs');
        var tabContents = document.querySelectorAll('.tab-content');
        var detailPage = document.getElementById('loan-detail-page');
        currentDetailSource = 'loan-management';

        initLoanDetailContent();

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

    function syncBodyOverflow() {
        document.body.style.overflow = document.querySelector('.modal.show') ? 'hidden' : '';
    }

    function showModalById(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            syncBodyOverflow();
        }
    }

    function closeModalById(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            syncBodyOverflow();
        }
    }

    function closeTopModal() {
        var modals = document.querySelectorAll('.modal.show');
        if (!modals.length) {
            return false;
        }

        modals[modals.length - 1].classList.remove('show');
        syncBodyOverflow();
        return true;
    }

    window.showRecordModal = function() {
        showModalById('record-modal');
    };

    window.closeRecordModal = function() {
        closeModalById('record-modal');
    };

    window.showLoanRecordModal = function() {
        showModalById('loan-record-modal');
    };

    window.closeLoanRecordModal = function() {
        closeModalById('loan-record-modal');
    };

    window.showReportRecordModal = function() {
        showActionModal('report-record-modal');
    };

    window.closeReportRecordModal = function() {
        closeActionModal('report-record-modal');
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
        showModalById(modalId);
    }

    function closeActionModal(modalId) {
        closeModalById(modalId);
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
        var navTabs = document.querySelector('.nav-tabs');
        var targetNav = document.querySelector('.nav-tabs .nav-item[data-tab="' + currentDetailSource + '"]');
        var navItems = document.querySelectorAll('.nav-tabs .nav-item');
        var tabContents = document.querySelectorAll('.tab-content');
        var targetContent = document.getElementById(currentDetailSource);
        var detailPage = document.getElementById('detail-page');
        var loanDetailPage = document.getElementById('loan-detail-page');
        var changeDetailPage = document.getElementById('change-detail-page');
        var reportDetailPage = document.getElementById('report-detail-page');

        if (detailPage) {
            detailPage.classList.remove('show');
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

        if (navTabs) {
            navTabs.style.display = '';
        }

        for (var i = 0; i < navItems.length; i++) {
            navItems[i].classList.remove('active');
        }

        for (var j = 0; j < tabContents.length; j++) {
            tabContents[j].classList.remove('active');
        }

        if (targetNav) {
            targetNav.classList.add('active');
        }

        if (targetContent) {
            targetContent.classList.add('active');
        }

        document.body.style.overflow = '';
    };

    document.addEventListener('click', function(event) {
        var recordModal = document.getElementById('record-modal');
        var loanRecordModal = document.getElementById('loan-record-modal');
        var reportRecordModal = document.getElementById('report-record-modal');
        var loanApprovalRecordModal = document.getElementById('loan-approval-record-modal');
        var loanWithdrawModal = document.getElementById('loan-withdraw-modal');
        var approveModal = document.getElementById('approve-modal');
        var backModal = document.getElementById('back-modal');
        var rejectModal = document.getElementById('reject-modal');
        
        if (recordModal && event.target === recordModal) {
            closeRecordModal();
        }

        if (loanRecordModal && event.target === loanRecordModal) {
            closeLoanRecordModal();
        }

        if (reportRecordModal && event.target === reportRecordModal) {
            closeReportRecordModal();
        }

        if (loanApprovalRecordModal && event.target === loanApprovalRecordModal) {
            closeLoanApprovalRecordModal();
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
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            if (closeTopModal()) {
                return;
            }

            if (document.querySelector('.detail-page.show')) {
                window.goBack();
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
                    var radioGroup = this.parentElement;
                    var input = this.querySelector('input[type="radio"]');
                    if (!radioGroup || !input || input.disabled) {
                        return;
                    }

                    var radios = radioGroup.querySelectorAll('.radio-item');

                    for (var j = 0; j < radios.length; j++) {
                        radios[j].classList.remove('active');
                    }

                    this.classList.add('active');
                    input.checked = true;
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

    function initPagedLists() {
        setupPagedList({
            containerSelector: '#business-approval',
            listSelector: '.approval-list',
            itemSelector: '.approval-card',
            paginationSelector: '.pagination',
            badgeSelector: '.nav-item[data-tab="business-approval"] .badge',
            pageSize: 5
        });
        setupPagedList({
            containerSelector: '#report-approval',
            listSelector: '.report-card-list',
            itemSelector: '.approval-card',
            paginationSelector: '.pagination',
            badgeSelector: '.nav-item[data-tab="report-approval"] .badge',
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
})();
