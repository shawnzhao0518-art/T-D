const supabaseUrl = 'https://mgrorhbschtyrdrekfhb.supabase.co';
const supabaseKey = 'sb_publishable_bbYg4Bl2F5uHC_3XqdH2RA_NOnp3wfc';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('booking-form');
const statusEl = document.getElementById('form-status');
const langToggle = document.getElementById('lang-toggle');

// --------------------------- 多语言字典 ---------------------------
const i18n = {
  en: {
    hero_title: 'Professional Car Repair & Maintenance',
    hero_desc: 'Transparent pricing · OEM standards · Fast delivery. Every service you can trust.',
    hero_cta_primary: 'Book Now',
    hero_cta_secondary: 'View Services',
    hero_badge1: '1-year / 20,000 km Warranty',
    hero_badge2: 'Same-day Quick Service',
    hero_badge3: 'OEM-level Diagnostics',
    services_title: 'Our Services',
    svc_maint_title: 'Maintenance',
    svc_maint_desc: 'Oil & filter change, full inspection, diagnostic check.',
    svc_engine_title: 'Engine & Transmission',
    svc_engine_desc: 'Diagnostics, repairs, and overhauls for power systems.',
    svc_brake_title: 'Brakes & Suspension',
    svc_brake_desc: 'Brake pad/rotor replacement, suspension alignment.',
    svc_tire_title: 'Tires & Wheel Alignment',
    svc_tire_desc: 'Tire replacement, balancing, and alignment.',
    svc_ev_title: 'EV Services',
    svc_ev_desc: 'High-voltage inspection, battery health evaluation.',
    booking_title: 'Online Booking',
    form_phone_label: 'Phone',
    form_car_label: 'Car Model',
    form_date_label: 'Date',
    form_time_label: 'Time',
    form_service_label: 'Service Type',
    form_note_label: 'Notes',
    form_submit: 'Submit',
    about_title: 'About T&D Autocare',
    about_desc: 'We are a modern auto service center adhering to professionalism, transparency, and punctuality.',
    contact_title: 'Contact Us'
  },

  zh: {
    hero_title: '专业汽车维修与保养',
    hero_desc: '透明报价 · 原厂标准 · 快速交付，让每一次服务更放心。',
    hero_cta_primary: '立即预约',
    hero_cta_secondary: '查看服务',
    hero_badge1: '一年 / 20,000公里质保',
    hero_badge2: '当天快修',
    hero_badge3: '原厂级检测',
    services_title: '服务项目',
    svc_maint_title: '保养服务',
    svc_maint_desc: '更换机油三滤、全车检查、电脑诊断。',
    svc_engine_title: '发动机与变速箱',
    svc_engine_desc: '疑难故障检修、动力系统维护与翻新。',
    svc_brake_title: '刹车与底盘',
    svc_brake_desc: '刹车片/盘更换、减震与悬架校正。',
    svc_tire_title: '轮胎与四轮定位',
    svc_tire_desc: '轮胎更换、动平衡、四轮定位。',
    svc_ev_title: '新能源专项',
    svc_ev_desc: '高压系统检测、电池健康评估。',
    booking_title: '在线预约',
    form_phone_label: '手机',
    form_car_label: '车型',
    form_date_label: '日期',
    form_time_label: '时间',
    form_service_label: '服务类型',
    form_note_label: '备注',
    form_submit: '提交',
    about_title: '关于 T&D Autocare',
    about_desc: '我们是一家以专业、透明、守时为宗旨的现代化汽修中心。',
    contact_title: '联系我们'
  }
};

// --------------------------- 语言切换逻辑 ---------------------------
let currentLang = 'en';

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  document.documentElement.lang = currentLang;
  document.title = currentLang === 'en'
    ? 'T&D Autocare | Professional Car Repair & Maintenance'
    : 'T&D Autocare | 专业汽车维修与保养';

  // 替换页面文本
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[currentLang][key]) {
      el.textContent = i18n[currentLang][key];
    }
  });
});

// --------------------------- 表单提交逻辑 ---------------------------
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  const { error } = await supabaseClient.from('tasks').insert([{
    date: data.date,
    time: data.time,
    car: data.car,
    project: data.service,
    contact: data.phone,
    note: data.note,
    source: 'customer'
  }]);

  if (error) {
    statusEl.textContent = currentLang === 'en' ? 'Submission failed. Please try again.' : '提交失败，请重试。';
  } else {
    statusEl.textContent = currentLang === 'en' ? 'Booking submitted successfully!' : '预约提交成功！';
    form.reset();
  }
});
