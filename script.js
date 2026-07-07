(() => {
    const form = document.getElementById('mvp-form');
    const list = document.getElementById('recommendation-list');
    const scrollButton = document.getElementById('scroll-demo');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const showLoginButton = document.getElementById('show-login');
    const showSignupButton = document.getElementById('show-signup');
    const authTitle = document.getElementById('auth-title');
    const authForm = document.getElementById('auth-form');

    const recommendations = {
        restaurant: {
            seoul: [
                { title: '지역상권 활성화 지원금', meta: '매칭도 92%', text: '음식점 업종에 적합한 창업·운영 지원 제도입니다.' },
                { title: '에너지 절감 컨설팅 지원', meta: '매칭도 88%', text: '냉장·조리 시설 개선에 도움이 되는 정책입니다.' }
            ],
            busan: [
                { title: '해양·관광 연계 지원금', meta: '매칭도 86%', text: '부산 지역 특화 정책으로 신청 가능성이 높습니다.' },
                { title: '직원 채용 지원금', meta: '매칭도 84%', text: '고용 인건비 부담 완화에 유리합니다.' }
            ]
        },
        beauty: {
            seoul: [
                { title: '미용 업종 디지털 전환 지원', meta: '매칭도 90%', text: '예약·매출 관리 시스템 도입에 적합합니다.' },
                { title: '청년 창업 지원금', meta: '매칭도 82%', text: '초기 인테리어·장비 구입 비용을 지원합니다.' }
            ],
            busan: [
                { title: '소상공인 경영안정자금', meta: '매칭도 85%', text: '운영자금 확보에 도움이 되는 제도입니다.' },
                { title: '직원 교육 지원', meta: '매칭도 80%', text: '서비스 품질 향상을 위한 교육비 지원이 가능합니다.' }
            ]
        },
        cafe: {
            seoul: [
                { title: '카페 친환경 인증 지원', meta: '매칭도 89%', text: '친환경 인테리어와 설비 개선에 유리합니다.' },
                { title: '지역 상권 혁신 지원', meta: '매칭도 87%', text: '공공·민간 연계 프로젝트 신청 가능성이 높습니다.' }
            ],
            busan: [
                { title: '관광객 유입 지원금', meta: '매칭도 83%', text: '지역 관광 연계 홍보비 지원이 가능할 수 있습니다.' }
            ]
        },
        retail: {
            seoul: [
                { title: '온라인 판매 활성화 지원', meta: '매칭도 91%', text: '온라인 상점 구축 및 디지털 마케팅 비용을 지원합니다.' },
                { title: '매장 리모델링 지원', meta: '매칭도 84%', text: '점포 개선과 고객 경험 향상에 도움이 됩니다.' }
            ],
            busan: [
                { title: '소매업 경영안정 지원', meta: '매칭도 82%', text: '운영 자금과 재고 회전 개선에 효과적입니다.' }
            ]
        }
    };

    let savedItems = [];

    function updateReadiness(industry, region, size, employees) {
        const score = Math.min(96, 60 + (industry === 'restaurant' || industry === 'beauty' ? 8 : 4) + (region === 'seoul' || region === 'busan' ? 6 : 3) + (size === 'small' ? 8 : size === 'medium' ? 5 : 3) + (employees >= 5 ? 4 : 2));
        document.getElementById('readiness-score').textContent = `${score}%`;
        document.getElementById('readiness-fill').style.width = `${score}%`;
        const text = score >= 85 ? '신청 준비가 매우 좋습니다. 바로 서류를 정리해 보세요.' : score >= 70 ? '기본 정보는 충분합니다. 필요한 서류를 추가로 확인해 보세요.' : '추가 정보와 서류를 보완하면 신청 성공률이 올라갑니다.';
        document.getElementById('readiness-text').textContent = text;
    }

    function renderSavedItems() {
        const container = document.getElementById('saved-list');
        if (!savedItems.length) {
            container.innerHTML = '<div class="saved-item">관심 지원금을 저장하면 여기에 표시됩니다.</div>';
            return;
        }
        container.innerHTML = savedItems.map((item) => `
            <div class="saved-item">${item}</div>
        `).join('');
    }

    function renderRecommendations(industry, region) {
        const items = recommendations[industry]?.[region] || [];
        const employees = document.getElementById('employees').value;
        const size = document.getElementById('size').value;
        updateReadiness(industry, region, size, Number(employees));

        if (!items.length) {
            list.innerHTML = '<div class="recommendation-item"><h4>추천 결과가 없습니다.</h4><p>다른 조건으로 다시 시도해 보세요.</p></div>';
            return;
        }

        list.innerHTML = items.map((item) => `
            <div class="recommendation-item">
                <div class="meta">${item.meta}</div>
                <h4>${item.title}</h4>
                <p>${item.text}</p>
                <div class="item-footer">
                    <span>필수 서류: ${item.docs || '사업자등록증, 신청서'}</span>
                    <button class="save-btn" type="button" data-title="${item.title}">저장</button>
                </div>
            </div>
        `).join('');
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const industry = document.getElementById('industry').value;
        const region = document.getElementById('region').value;
        renderRecommendations(industry, region);
    });

    list.addEventListener('click', (event) => {
        const button = event.target.closest('.save-btn');
        if (!button) return;
        const title = button.dataset.title;
        if (!savedItems.includes(title)) {
            savedItems.push(title);
            renderSavedItems();
        }
    });

    scrollButton?.addEventListener('click', () => {
        document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    const guideResponses = {
        default: '지원금 추천, 노동법 요약, 계약서 체크포인트 중 무엇을 도와드릴까요?',
        계약서: '계약서에는 종료 조건, 해지 통지 기간, 위약금 조항, 임금 지급 방식이 특히 중요합니다. 반드시 확인해 주세요.',
        노동법: '노동법은 최저임금, 주휴수당, 근로시간, 휴게시간 기준을 우선 확인하는 것이 좋습니다.',
        지원금: '지원금은 업종·지역·매장 규모에 따라 신청 자격이 달라지므로, 현재 사업 정보와 함께 비교해 보세요.'
    };

    function addChatMessage(text, type = 'bot') {
        const item = document.createElement('div');
        item.className = `chat-item ${type}`;
        item.textContent = text;
        chatMessages.appendChild(item);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const question = chatInput.value.trim();
        if (!question) return;

        addChatMessage(question, 'user');
        chatInput.value = '';

        const lower = question.toLowerCase();
        let answer = guideResponses.default;
        if (lower.includes('계약서')) answer = guideResponses.계약서;
        else if (lower.includes('노동') || lower.includes('법')) answer = guideResponses.노동법;
        else if (lower.includes('지원금')) answer = guideResponses.지원금;

        setTimeout(() => addChatMessage(answer), 350);
    });

    showLoginButton?.addEventListener('click', () => {
        authTitle.textContent = '로그인';
        authForm.querySelector('button').textContent = '로그인';
    });

    showSignupButton?.addEventListener('click', () => {
        authTitle.textContent = '회원가입';
        authForm.querySelector('button').textContent = '회원가입';
    });

    authForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const buttonText = authForm.querySelector('button').textContent;
        alert(`${buttonText} 요청이 접수되었습니다. MVP에서는 데모용입니다.`);
    });

    renderRecommendations('restaurant', 'seoul');
})();
