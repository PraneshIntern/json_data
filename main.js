
const express = require('express');
const { existsSync } = require('fs');
const mysql = require('mysql');
const path = require('path');
const cron = require('node-cron');
const exec = require('child_process').exec;
const fs = require('fs');



const app = express();
const port = 3000;

const dbConfig = {
  host: '162.241.85.121',
  user: 'athulslv_muthukumar',
  password: 'Athulya@123',
  database: 'athulslv_sal_subscriber102'
};

const pool = mysql.createPool(dbConfig);

if (!existsSync(path.join(__dirname, 'datas'))) {
  fs.mkdir(path.join(__dirname, 'datas'));
} else {
  console.log("Folder already in this project!")
}

var patients = cron.schedule("0 */10 * * * *", function () {
  pool.query('SELECT id, branch_id, first_name, last_name, gender FROM patients', (err, result) => {
    if (err) {
      console.error('Error querying patients:', err);
      return;
    }
    fs.writeFile(path.join('datas', 'users.json'), JSON.stringify(result), function (err) {
      if (err) {
        console.error('Error saving data:', err);
      } else {
        console.log('Patients data has been saved into JSON with a 1-second interval');
      }
    });
  });
});

var activity = cron.schedule("0 */10 * * * *", function () {
  pool.query('SELECT id, patient_id, lead_id, schedule_date, schedule_id, activity_rate, invoice_status, created_at, activity_category FROM patient_activity_advance', (err, result) => {
    if (err) {
      console.error('Error querying activity:', err);
      return;
    }
    fs.writeFile(path.join('datas', 'patient_activity_advance.json'), JSON.stringify(result), function (err) {
      if (err) {
        console.error('Error saving data:', err);
      } else {
        console.log("patient_activity_advance data has been saved into the file with a 1-second interval");
      }
    });
  });
});

var fb = cron.schedule("0 */10 * * * *", function () {
  pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,fb_rate,fb_amount,tax_rate,invoice_status,created_at FROM patient_activity_fb', (err, result) => {
    if (err) {
      console.error('Error querying activity:', err);
      return;
    }
    fs.writeFile(path.join('datas', 'patient_activity_fb.json'), JSON.stringify(result), function (err) {
      if (err) {
        console.error('Error saving data:', err);
      } else {
        console.log("patient_activity_fb data has been saved into the file with a 1-second interval");
      }
    });
  });
});

var emer = cron.schedule("0 */10 * * * *", function () {
  pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,emergency_care_rate,emergency_care_amount,tax_rate,invoice_status,created_at FROM patient_activity_medical_emergency_care', (err, result) => {
    if (err) {
      console.error('Error querying activity:', err);
      return;
    }
    fs.writeFile(path.join('datas', 'patient_activity_fb.json'), JSON.stringify(result), function (err) {
      if (err) {
        console.error('Error saving data:', err);
      } else {
        console.log("patient_activity_medical_emergency_care data has been saved into the file with a 1-second interval");
      }
    });
  });
});



var personal = cron.schedule("0 */10 * * * *", function () {
  pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,personal_care_rate,personal_care_amount,tax_rate,invoice_status,created_at FROM patient_activity_personal_care_service', (err, result) => {
    if (err) {
      console.error('Error querying activity:', err);
      return;
    }
    fs.writeFile(path.join('datas', 'patient_activity_personal_care_service.json'), JSON.stringify(result), function (err) {
      if (err) {
        console.error('Error saving data:', err);
      } else {
        console.log("patient_activity_personal_care_service data has been saved into the file with a 1-second interval");
      }
    });
  });
});

var eqp = cron.schedule("0 */10 * * * *", function () {
  pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,medical_equipment_rate,medical_equipment_amount,tax_rate,invoice_status,created_at FROM patient_activity_medical_euipments', (err, result) => {
    if (err) {
      console.error('Error querying activity:', err);
      return;
    }
    fs.writeFile(path.join('datas', 'patient_activity_medical_euipments.json'), JSON.stringify(result), function (err) {
      if (err) {
        console.error('Error saving data:', err);
      } else {
        console.log("patient_activity_medical_euipments data has been saved into the file with a 1-second interval");
      }
    });
  });
});



var pro = cron.schedule("0 */10 * * * *", function () {
  pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,procedure_service_rate,procedure_service_amount,tax_rate,invoice_status,created_at FROM patient_activity_procedure_service', (err, result) => {
    if (err) {
      console.error('Error querying activity:', err);
      return;
    }
    fs.writeFile(path.join('datas', 'patient_activity_procedure_service.json'), JSON.stringify(result), function (err) {
      if (err) {
        console.error('Error saving data:', err);
      } else {
        console.log("patient_activity_procedure_service data has been saved into the file with a 1-second interval");
      }
    });
  });
});


var extra = cron.schedule("0 */10 * * * *", function () {
  pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,extra_service_rate,extra_service_amount,tax_rate,invoice_status,created_at FROM patient_activity_staff_extra_service', (err, result) => {
    if (err) {
      console.error('Error querying activity:', err);
      return;
    }
    fs.writeFile(path.join('datas', 'patient_activity_staff_extra_service.json'), JSON.stringify(result), function (err) {
      if (err) {
        console.error('Error saving data:', err);
      } else {
        console.log("patient_activity_staff_extra_service data has been saved into the file with a 1-second interval");
      }
    });
  });
});


var main = cron.schedule("0 */10 * * * *", function (err) {
    exec('node new_db.js')
    if (err) {
        console.err(err);
    }
    else 
    {
        console.log("Executed");
    }
    console.log("executed");
});

main.start();
patients.start();
activity.start();
fb.start();
emer.start();
personal.start();
eqp.start();
pro.start();
extra.start();

app.get('/emergency_care', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientActivityData = JSON.parse(fs.readFileSync('datas/patient_activity_medical_euipments.json'));

  const branchData = {};

  usersData.forEach((user) => {
    const branchId = user.branch_id;
    const userId = user.id;

    if (!branchData[branchId]) {
      branchData[branchId] = { total_emergency_care_amount: 0, data: [] };
    }

    const filteredData = patientActivityData.filter((activity) => {
      const activityDate = new Date(activity.created_at);
      return userId === activity.patient_id && activityDate >= new Date(start) && activityDate <= new Date(end);
    });

    if (filteredData.length > 0) {
      const totalAmount = filteredData.reduce((sum, activity) => sum + activity.medical_equipment_amount, 0);
      branchData[branchId].total_emergency_care_amount += totalAmount;
      branchData[branchId].data.push({ patient_id: userId, medical_equipment_amount: totalAmount });
    }
  });

  const response = [];

  if (branch) {
    if (branchData[branch]) {
      response.push({ branch: branch, data: branchData[branch].data });
      const totalSumEmergencyCare = branchData[branch].total_emergency_care_amount;
      response.unshift({ branch: branch, total_emergency_care_amount: totalSumEmergencyCare });
    } else {
      return res.status(404).json({ message: 'No data found for the given branch' });
    }
  } else {
    for (const branchId in branchData) {
      response.push({ branch: branchId, data: branchData[branchId].data });
    }
    const totalSumEmergencyCare = response.reduce((sum, branch) => sum + branchData[branch.branch].total_emergency_care_amount, 0);
    response.unshift({ total_emergency_care_amount: totalSumEmergencyCare });
  }

  res.json(response);
});




app.get('/fb', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientActivityData = JSON.parse(fs.readFileSync('datas/patient_activity_fb.json'));

  const branchData = {};

  usersData.forEach((user) => {
    const branchId = user.branch_id;
    const userId = user.id;

    if (!branchData[branchId]) {
      branchData[branchId] = { total_fb_amount: 0, data: [] };
    }

    const filteredData = patientActivityData.filter((activity) => {
      const activityDate = new Date(activity.created_at);
      return userId === activity.patient_id && activityDate >= new Date(start) && activityDate <= new Date(end);
    });

    if (filteredData.length > 0) {
      const totalAmount = filteredData.reduce((sum, activity) => sum + activity.fb_amount, 0);
      branchData[branchId].total_fb_amount += totalAmount;
      branchData[branchId].data.push({ patient_id: userId, medical_equipment_amount: totalAmount });
    }
  });

  const response = [];

  if (branch) {
    if (branchData[branch]) {
      response.push({ branch: branch, data: branchData[branch].data });
      const totalSumEmergencyCare = branchData[branch].total_fb_amount;
      response.unshift({ branch: branch, total_fb_amount: totalSumEmergencyCare });
    } else {
      return res.status(404).json({ message: 'No data found for the given branch' });
    }
  } else {
    for (const branchId in branchData) {
      response.push({ branch: branchId, data: branchData[branchId].data });
    }
    const totalSumEmergencyCare = response.reduce((sum, branch) => sum + branchData[branch.branch].total_fb_amount, 0);
    response.unshift({ total_fb_amount: totalSumEmergencyCare });
  }

  res.json(response);
});


app.get('/personal_care', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientActivityData = JSON.parse(fs.readFileSync('datas/patient_activity_personal_care_service.json'));

  const branchData = {};

  usersData.forEach((user) => {
    const branchId = user.branch_id;
    const userId = user.id;

    if (!branchData[branchId]) {
      branchData[branchId] = { total_sum_personal_care: 0, data: [] };
    }

    const filteredData = patientActivityData.filter((activity) => {
      const activityDate = new Date(activity.created_at);
      return userId === activity.patient_id && activityDate >= new Date(start) && activityDate <= new Date(end);
    });

    if (filteredData.length > 0) {
      const totalAmount = filteredData.reduce((sum, activity) => sum + activity.personal_care_amount, 0);
      branchData[branchId].total_sum_personal_care += totalAmount;
      branchData[branchId].data.push({ patient_id: userId, personal_care_amount: totalAmount });
    }
  });

  const response = [];

  if (branch) {
    if (branchData[branch]) {
      response.push({ branch: branch, data: branchData[branch].data });
      const totalSumPersonalCare = branchData[branch].total_sum_personal_care;
      response.unshift({ branch: branch, total_sum_personal_care: totalSumPersonalCare });
    } else {
      return res.status(404).json({ message: 'No data found for the given branch' });
    }
  } else {
    for (const branchId in branchData) {
      response.push({ branch: branchId, data: branchData[branchId].data });
    }
    const totalSumPersonalCare = response.reduce((sum, branch) => sum + branchData[branch.branch].total_sum_personal_care, 0);
    response.unshift({ total_sum_personal_care: totalSumPersonalCare });
  }

  res.json(response);
});

  
  
app.get('/users', (req, res) => {
  const { branch } = req.query;

  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));

  const matchingUserIds = usersData
    .filter((user) => user.branch_id === parseInt(branch)) 
    .map((user) => user.id);

  if (matchingUserIds.length === 0) {
    return res.status(404).json({ message: 'No users found for the given branch' });
  }

  res.json(matchingUserIds);
});






app.listen(port, () => {
  console.log('Server has been started on', port, "http://localhost:3000");
});