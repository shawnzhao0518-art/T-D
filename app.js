const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];

const state = {
  activeSlide: 0,
  autoplayMs: 6000,
  timer: null,
  lang: localStorage.getItem('lang') || 'zh'
};

const i18n = {
  zh: {
    nav_services: '服务项目',
    nav_about: '关于我们',
    nav_testimonials: '客户评价',
    nav_contact: '联系我们',
    nav_booking: '在线预约',

    hero_title: '专业汽车维修与保养',
    hero_desc: '透明报价 · 原厂标准 · 快速交付。每一次服务，都让您更放心。',
    hero_cta_primary: '立即预约',
    hero_cta_secondary: '了解服务',
    hero_badge1: '一年/20,000公里质保',
    hero_badge2: '当天快修',
    hero_badge3: '原厂级检测',

    services_title: '服务项目',
    svc_maint_title: '保养服务',
    svc_maint_desc: '更换机油三滤、全车检查、电脑诊断。',
    svc_engine_title: '发动机/变速箱',
    svc_engine_desc: '疑难故障检修、动力系统维护与翻新。',
    svc_brake_title: '刹车与底盘',
    svc_brake_desc: '刹车片/盘更换、减震与悬架校正。',
    svc_body_title: '钣金喷漆',
    svc_body_desc: '事故修复、原厂色号配比、三层清漆。',
    svc_tire_title: '轮胎与四轮定位',
    svc_tire_desc: '轮胎更换、动平衡、四轮定位。',
    svc_ev_title: '新能源专项',
    svc_ev_desc: '高压系统检测、电池健康评估。',

    booking_title: '在线预约',
    form_name_label: '姓名',
    form_name_ph: '您的姓名',
    form_phone_label: '手机',
    form_phone_ph: '例如 13800000000',
    form_car_label: '车型',
    form_car_ph: '品牌 / 车型 / 年款',
    form_date_label: '日期',
    form_service_label: '服务类型',
    form_service_opt_placeholder: '请选择',
    form_service_opt_maint: '保养服务',
    form_service_opt_engine: '发动机/变速箱',
    form_service_opt_brake: '刹车与底盘',
    form_service_opt_body: '钣金喷漆',
    form_service_opt_tire: '轮胎与四轮定位',
    form_service_opt_ev: '新能源专项',
    form_note_label: '备注',
    form_note_ph: '简单描述您的需求或故障现象',
    form_submit: '提交预约',

    about_title: '关于 T&D Autocare',
    about_desc: 'T&D Autocare 位于悉尼南区，是一家值得信赖的本地汽车维修与保养中心。我们专注于为各类车型提供全面的服务，包括发动机保养、刹车系统检查、更换轮胎、电池检测、更换机油与滤芯等。我们的团队由经验丰富的技师组成，秉持"专业、诚信、高效"的服务理念，为客户提供安全可靠的出行保障。无论是日常保养还是复杂维修，我们都以合理的价格和高质量的工艺赢得客户口碑。T&D Autocare 同时致力于成为社区的一部分，我们珍惜每一位老客户的信任，也欢迎新朋友的到来。您的爱车，就是我们的责任。',
    about_check1: '标准化接车与复检',
    about_check2: '维修过程全程可视',
    about_check3: '配件来源可追溯',
    stats_label_vehicles: '+ 累计服务车辆',
    stats_label_satisfaction: '% 客户满意度',
    stats_label_experience: '年 行业经验',

    testimonials_title: '客户评价',
    testimonial_1_text: '价格透明，师傅专业，还给了保养建议。下次还会来！',
    testimonial_1_by: '— 王先生 · 宝马3系',
    testimonial_2_text: '喷漆色差几乎看不出来，交车速度也很快，点赞。',
    testimonial_2_by: '— 李女士 · 奔驰GLC',
    testimonial_3_text: '电车高压检测很细致，报告清晰，靠谱。',
    testimonial_3_by: '— 陈先生 · 特斯拉Model 3',

    contact_title: '联系我们',
    contact_phone_label: '电话：',
    contact_wechat_label: '微信：',
    contact_address_label: '地址：',
    contact_address: '78 Gibson Ave, Padstow NSW 2211, Australia',
    contact_hours_label: '营业时间：',
    contact_hours_monfri: '周一至周五 09:00 – 17:00',
    contact_hours_sat: '周六 09:00 – 14:00',
    contact_hours_sun: '周日 休息',
    contact_payment_label: '支付方式：',
    contact_payment: '支持 Apple Pay 及主流银行卡。',
    contact_cta: '预约到店',

    footer_tagline: '诚信经营 · 专业服务',
    footer_services: '服务',
    footer_about: '关于',
    footer_contact: '联系',
    footer_booking: '预约',

    status_fill_form: '请完整填写表单。',
    status_phone_invalid: '手机号格式不正确。',
    status_submitting: '正在提交...',
    status_submitted: '预约已提交，我们将尽快与您联系确认时间。'
  },
  en: {
    nav_services: 'Services',
    nav_about: 'About Us',
    nav_testimonials: 'Testimonials',
    nav_contact: 'Contact',
    nav_booking: 'Book Online',

    hero_title: 'Professional Auto Repair & Care',
    hero_desc: 'Transparent pricing · OEM standards · Fast turnaround. Service you can trust.',
    hero_cta_primary: 'Book Now',
    hero_cta_secondary: 'View Services',
    hero_badge1: '1 year / 20,000 km warranty',
    hero_badge2: 'Same-day quick service',
    hero_badge3: 'OEM-level diagnostics',

    services_title: 'Our Services',
    svc_maint_title: 'Maintenance',
    svc_maint_desc: 'Oil and filters, full inspection, computer diagnostics.',
    svc_engine_title: 'Engine / Transmission',
    svc_engine_desc: 'Complex fault diagnosis, powertrain service & refurbish.',
    svc_brake_title: 'Brakes & Chassis',
    svc_brake_desc: 'Pads/rotors replacement, shocks & suspension alignment.',
    svc_body_title: 'Body & Paint',
    svc_body_desc: 'Accident repair, OEM color match, triple clear coat.',
    svc_tire_title: 'Tires & Alignment',
    svc_tire_desc: 'Tire replacement, balancing, four-wheel alignment.',
    svc_ev_title: 'EV Specialist',
    svc_ev_desc: 'High-voltage checks, battery health assessment.',

    booking_title: 'Online Booking',
    form_name_label: 'Name',
    form_name_ph: 'Your name',
    form_phone_label: 'Phone',
    form_phone_ph: 'e.g. 13800000000',
    form_car_label: 'Vehicle',
    form_car_ph: 'Brand / Model / Year',
    form_date_label: 'Date',
    form_service_label: 'Service Type',
    form_service_opt_placeholder: 'Please select',
    form_service_opt_maint: 'Maintenance',
    form_service_opt_engine: 'Engine / Transmission',
    form_service_opt_brake: 'Brakes & Chassis',
    form_service_opt_body: 'Body & Paint',
    form_service_opt_tire: 'Tires & Alignment',
    form_service_opt_ev: 'EV Specialist',
    form_note_label: 'Notes',
    form_note_ph: 'Briefly describe the issue or request',
    form_submit: 'Submit Booking',

    about_title: 'About T&D Autocare',
    about_desc: 'Located in Sydney\'s South, T&D Autocare is a trusted local automotive service centre offering comprehensive car care — from logbook servicing, brake inspection, and tyre replacement to battery checks and oil changes. Our skilled technicians take pride in delivering honest, professional, and efficient service to keep your vehicle running safely and smoothly. Whether it\'s routine maintenance or complex repair work, we focus on quality craftsmanship at a fair price. At T&D Autocare, we\'re more than just a workshop — we\'re part of the community. We value every returning customer and look forward to welcoming new ones. Your car. Our care.',
    about_check1: 'Standardized intake & re-inspection',
    about_check2: 'Fully visible repair process',
    about_check3: 'Traceable parts sourcing',
    stats_label_vehicles: '+ Vehicles serviced',
    stats_label_satisfaction: '% Customer satisfaction',
    stats_label_experience: 'Years of experience',

    testimonials_title: 'Testimonials',
    testimonial_1_text: 'Transparent pricing, professional techs, and helpful maintenance tips. Will come again!',
    testimonial_1_by: '— Mr. Wang · BMW 3 Series',
    testimonial_2_text: 'Paint match is almost perfect, and the delivery was quick. Great job.',
    testimonial_2_by: '— Ms. Li · Mercedes GLC',
    testimonial_3_text: 'Thorough HV inspection for my EV with a clear report. Reliable.',
    testimonial_3_by: '— Mr. Chen · Tesla Model 3',

    contact_title: 'Contact Us',
    contact_phone_label: 'Phone: ',
    contact_address_label: 'Address: ',
    contact_address: '78 Gibson Ave, Padstow NSW 2211, Australia',
    contact_hours_label: 'Hours: ',
    contact_hours_monfri: 'Monday – Friday: 9:00 AM – 5:00 PM',
    contact_hours_sat: 'Saturday: 9:00 AM – 2:00 PM',
    contact_hours_sun: 'Sunday: Closed',
    contact_payment_label: 'Payment Methods: ',
    contact_payment: 'We accept Apple Pay and major cards.',
    contact_cta: 'Book a visit',

    footer_tagline: 'Integrity · Professional Service',
    footer_services: 'Services',
    footer_about: 'About',
    footer_contact: 'Contact',
    footer_booking: 'Booking',

    status_fill_form: 'Please complete the form.',
    status_phone_invalid: 'Invalid phone number format.',
    status_submitting: 'Submitting...',
    status_submitted: 'Booking submitted. We will contact you to confirm.'
  }
};

function applyLang(lang) {
  state.lang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  // Title & meta
  const titleEl = document.querySelector('title');
  if (titleEl) {
    titleEl.textContent = lang === 'zh' ? 'T&D Autocare | 专业汽车维修与保养' : 'T&D Autocare | Professional Auto Repair & Care';
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content',
      lang === 'zh'
        ? 'T&D Autocare——专业汽车维修、保养、钣金喷漆与轮胎服务。在线预约，透明报价，品质保证。'
        : 'T&D Autocare — Professional auto repair, maintenance, body & paint, and tire services. Online booking, transparent pricing, guaranteed quality.'
    );
  }
  // Generic text nodes
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = i18n[lang][key];
    if (typeof val === 'string') el.textContent = val;
  });
  // Placeholders
  $$('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = i18n[lang][key];
    if (typeof val === 'string') el.setAttribute('placeholder', val);
  });
}

function initLangToggle() {
  const btn = $('#lang-toggle');
  if (!btn) return;
  const updateBtnLabel = () => {
    btn.textContent = state.lang === 'zh' ? 'EN / 中文' : '中文 / EN';
    btn.setAttribute('aria-label', state.lang === 'zh' ? '切换语言' : 'Toggle language');
  };
  btn.addEventListener('click', () => {
    const next = state.lang === 'zh' ? 'en' : 'zh';
    applyLang(next);
    updateBtnLabel();
  });
  applyLang(state.lang);
  updateBtnLabel();
}

document.addEventListener('DOMContentLoaded', initLangToggle);

// Header: mobile nav toggle
(() => {
  const toggle = $('.nav-toggle');
  const nav = $('#site-nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// Footer year
(() => {
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Booking form validation + UX
(() => {
  const form = $('#booking-form');
  const status = $('#form-status');
  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    // Basic validation
    const required = ['name','phone','car','date','service'];
    const missing = required.filter(k => !String(data[k]||'').trim());
    if (missing.length) {
      status.textContent = i18n[state.lang].status_fill_form;
      status.style.color = '#c1121f';
      return;
    }
    const phoneOk = /^\\s*1\\d{10}\\s*$/.test(data.phone);
    if (!phoneOk) {
      status.textContent = i18n[state.lang].status_phone_invalid;
      status.style.color = '#c1121f';
      return;
    }

    // Simulate submission
    status.textContent = i18n[state.lang].status_submitting;
    status.style.color = '#333';
    form.querySelector('button[type="submit"]').disabled = true;

    setTimeout(() => {
      status.textContent = i18n[state.lang].status_submitted;
      status.style.color = 'var(--green-700)';
      form.reset();
      form.querySelector('button[type="submit"]').disabled = false;
    }, 900);
  });
})();

// Stats counter on view
(() => {
  const nums = $$('.stat .num');
  if (!nums.length) return;

  const animate = (el, target, duration=900) => {
    const start = 0;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0)/duration);
      const val = Math.floor(start + (target - start) * (1 - Math.pow(1-p, 3)));
      el.textContent = val + (el.dataset.count.endsWith('%') ? '%' : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nums.forEach(n => animate(n, parseInt(n.dataset.count,10)));
        io.disconnect();
      }
    });
  }, {threshold: 0.4});

  io.observe(nums[0]);
})();