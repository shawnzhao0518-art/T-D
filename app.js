const supabaseUrl = 'https://mgrorhbschtyrdrekfhb.supabase.co';
const supabaseKey = 'sb_publishable_bbYg4Bl2F5uHC_3XqdH2RA_NOnp3wfc';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('booking-form');
const statusEl = document.getElementById('form-status');
const langToggle = document.getElementById('lang-toggle');

const i18n = {
  en: {
    hero_title: 'Professional Car Repair & Maintenance',
    hero_desc: 'Transparent pricing · OEM standards · Fast delivery. Every service you can trust.',
    hero_cta_primary: 'Book Now',
    hero_cta_secondary: 'View Services',
    services_title: 'Our Services',
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
    services_title: '服务项目',
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

let currentLang = 'en';
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18n[currentLang][key] || el.textContent;
  });
});

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
  statusEl.textContent = error ? 'Submission failed.' : 'Booking submitted successfully!';
  if (!error) form.reset();
});