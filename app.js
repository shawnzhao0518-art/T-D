const supabaseUrl = 'https://mgrorhbschtyrdrekfhb.supabase.co';
const supabaseKey = 'sb_publishable_bbYg4Bl2F5uHC_3XqdH2RA_NOnp3wfc';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('booking-form');
const statusEl = document.getElementById('form-status');
const langToggle = document.getElementById('lang-toggle');

const i18n = {
  en: {
    booking_title: 'Online Booking',
    form_phone_label: 'Phone',
    form_car_label: 'Car Model',
    form_date_label: 'Date',
    form_time_label: 'Time',
    form_service_label: 'Service Type',
    form_note_label: 'Notes',
    form_submit: 'Submit',
  },
  zh: {
    booking_title: '在线预约',
    form_phone_label: '手机',
    form_car_label: '车型',
    form_date_label: '日期',
    form_time_label: '时间',
    form_service_label: '服务类型',
    form_note_label: '备注',
    form_submit: '提交',
  }
};

let currentLang = 'en';

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18n[currentLang][key];
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
  statusEl.textContent = error ? 'Error submitting form.' : 'Booking submitted successfully!';
  if (!error) form.reset();
});