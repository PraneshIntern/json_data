// const fs = require('fs').promises;
const express = require('express');
const { existsSync } = require('fs');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const cron = require('node-cron');
const readline = require('readline');
const JSONStream = require('JSONStream')
var logger = require("morgan");
const cors = require('cors');
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const https = require("https");

const app = express();
const port = 8080;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const dbConfig = {
  host: '162.241.85.121',
  user: 'athulslv_muthukumar',
  password: 'Athulya@123',
  database: 'athulslv_sal_subscriber102'
};

const pool = mysql.createPool(dbConfig);

async function createDataDirectory() {
  if (!existsSync(path.join(__dirname, 'datas'))) {
    try {
      await fs.mkdir(path.join(__dirname, 'datas'));
      console.log("Folder has been created in this project!");
    } catch (err) {
      console.error('Error creating the directory:', err);
    }
  } else {
    console.log("Folder already in this project!");
  }
}


createDataDirectory();


// var patients = cron.schedule("*/1 * * * * *", function () {
//   pool.query('SELECT id, branch_id, first_name, last_name, gender FROM patients', (err, result) => {
//     if (err) {
//       console.error('Error querying patients:', err);
//       return;
//     }
//     fs.writeFile(path.join('datas', 'users.json'), JSON.stringify(result), function (err) {
//       if (err) {
//         console.error('Error saving data:', err);
//       } else {
//         console.log('Patients data has been saved into JSON with a 1-second interval');
//       }
//     });
//   });
// });

// var activity = cron.schedule("*/1 * * * * *", function () {
//   pool.query('SELECT id, patient_id, lead_id, schedule_date, schedule_id, activity_rate, invoice_status, created_at, activity_category FROM patient_activity_advance', (err, result) => {
//     if (err) {
//       console.error('Error querying activity:', err);
//       return;
//     }
//     fs.writeFile(path.join('datas', 'patient_activity_advance.json'), JSON.stringify(result), function (err) {
//       if (err) {
//         console.error('Error saving data:', err);
//       } else {
//         console.log("patient_activity_advance data has been saved into the file with a 1-second interval");
//       }
//     });
//   });
// });

// var fb = cron.schedule("*/1 * * * * *", function () {
//   pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,fb_rate,fb_amount,tax_rate,invoice_status,created_at FROM patient_activity_fb', (err, result) => {
//     if (err) {
//       console.error('Error querying activity:', err);
//       return;
//     }
//     fs.writeFile(path.join('datas', 'patient_activity_fb.json'), JSON.stringify(result), function (err) {
//       if (err) {
//         console.error('Error saving data:', err);
//       } else {
//         console.log("patient_activity_fb data has been saved into the file with a 1-second interval");
//       }
//     });
//   });
// });

// var emer = cron.schedule("*/1 * * * * *", function () {
//   pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,emergency_care_rate,emergency_care_amount,tax_rate,invoice_status,created_at FROM patient_activity_medical_emergency_care', (err, result) => {
//     if (err) {
//       console.error('Error querying activity:', err);
//       return;
//     }
//     fs.writeFile(path.join('datas', 'patient_activity_fb.json'), JSON.stringify(result), function (err) {
//       if (err) {
//         console.error('Error saving data:', err);
//       } else {
//         console.log("patient_activity_medical_emergency_care data has been saved into the file with a 1-second interval");
//       }
//     });
//   });
// });



// var personal = cron.schedule("*/1 * * * * *", function () {
//   pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,personal_care_rate,personal_care_amount,tax_rate,invoice_status,created_at FROM patient_activity_personal_care_service', (err, result) => {
//     if (err) {
//       console.error('Error querying activity:', err);
//       return;
//     }
//     fs.writeFile(path.join('datas', 'patient_activity_personal_care_service.json'), JSON.stringify(result), function (err) {
//       if (err) {
//         console.error('Error saving data:', err);
//       } else {
//         console.log("patient_activity_personal_care_service data has been saved into the file with a 1-second interval");
//       }
//     });
//   });
// });


// var eqp = cron.schedule("*/1 * * * * *", function () {
//   pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,medical_equipment_rate,medical_equipment_amount,tax_rate,invoice_status,created_at FROM patient_activity_medical_euipments', (err, result) => {
//     if (err) {
//       console.error('Error querying activity:', err);
//       return;
//     }
//     fs.writeFile(path.join('datas', 'patient_activity_medical_euipments.json'), JSON.stringify(result), function (err) {
//       if (err) {
//         console.error('Error saving data:', err);
//       } else {
//         console.log("patient_activity_medical_euipments data has been saved into the file with a 1-second interval");
//       }
//     });
//   });
// });



// var pro = cron.schedule("*/1 * * * * *", function () {
//   pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,procedure_service_rate,procedure_service_amount,tax_rate,invoice_status,created_at FROM patient_activity_procedure_service', (err, result) => {
//     if (err) {
//       console.error('Error querying activity:', err);
//       return;
//     }
//     fs.writeFile(path.join('datas', 'patient_activity_procedure_service.json'), JSON.stringify(result), function (err) {
//       if (err) {
//         console.error('Error saving data:', err);
//       } else {
//         console.log("patient_activity_procedure_service data has been saved into the file with a 1-second interval");
//       }
//     });
//   });
// });


// var extra = cron.schedule("*/1 * * * * *", function () {
//   pool.query('SELECT id,patient_id,lead_id,schedule_id,schedule_date,extra_service_rate,extra_service_amount,tax_rate,invoice_status,created_at FROM patient_activity_staff_extra_service', (err, result) => {
//     if (err) {
//       console.error('Error querying activity:', err);
//       return;
//     }
//     fs.writeFile(path.join('datas', 'patient_activity_staff_extra_service.json'), JSON.stringify(result), function (err) {
//       if (err) {
//         console.error('Error saving data:', err);
//       } else {
//         console.log("patient_activity_staff_extra_service data has been saved into the file with a 1-second interval");
//       }
//     });
//   });
// });


// var extra = cron.schedule("*/1 * * * * *", function () {
//   pool.query('SELECT id,user_id,patient_id,lead_id,invoice_type,invoice_no,invoice_date,invoice_due_date,total_amount,status,consolidated_bill_no,created_at FROM bill_invoices', (err, result) => {
//     if (err) {
//       console.error('Error querying activity:', err);
//       return;
//     }
//     fs.writeFile(path.join('datas', 'bill_invoices.json'), JSON.stringify(result), function (err) {
//       if (err) {
//         console.error('Error saving data:', err);
//       } else {
//         console.log("bill_invoices data has been saved into the file with a 1-second interval");
//       }
//     });
//   });
// });

// patients.start();
// activity.start();
// fb.start();
// emer.start();
// personal.start();
// eqp.start();
// pro.start();
// extra.start();


// var schedules = cron.schedule("*/1 * * * * *", function () {
//   pool.query('SELECT id,user_id,patient_id,bed_id,membership_id,gross_rate,tax_rate,membership_type,amount,ratecard_id,status,invoice_status FROM patient_schedules', (err, result) => {
//     if (err) {
//       console.error('Error querying activity:', err);
//       return;
//     }
//     fs.writeFile(path.join('datas', 'patient_schedules.json'), JSON.stringify(result), function (err) {
//       if (err) {
//         console.error('Error saving data:', err);
//       } else {
//         console.log("patient_schedules data has been saved into the file with a 1-second interval");
//       }
//     });
//   });
// });

// schedules.start();


// var branches = cron.schedule("*/1 * * * * *", function () {
//   pool.query('SELECT id,branch_name,branch_code,branch_state_id,branch_city_id FROM `master_branches`', (err, result) => {
//     if (err) {
//       console.error('Error querying activity:', err);
//       return;
//     }
//     fs.writeFile(path.join('datas', 'master_branches.json'), JSON.stringify(result), function (err) {
//       if (err) {
//         console.error('Error saving data:', err);
//       } else {
//         console.log("master_branches data has been saved into the file with a 1-second interval");
//       }
//     });
//   });
// });

// branches.start();
app.get('/emergency_eqp', (req, res) => {
  const { branch, start, end, city, state } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientEmergencyEqpDataPath = 'datas/patient_activity_medical_euipments.json';
  const masterBranches = JSON.parse(fs.readFileSync('datas/master_branches.json'));

  const branchData = {};
  const totalSumEmergencyEqp = {};

  const fileStream = fs.createReadStream(patientEmergencyEqpDataPath, { encoding: 'utf8' });
  const jsonStream = JSONStream.parse('*');

  fileStream.pipe(jsonStream);

  jsonStream.on('data', (data) => {
    if (!data) {
      return;
    }

    const branchId = usersData.find((user) => user.id === data.patient_id)?.branch_id || 'undefined';
    const branchInfo = masterBranches.find((branch) => branch.id === branchId);

    const isCityMatching = !city || branchInfo.branch_city_id == city;
    const isStateMatching = !state || branchInfo.branch_state_id == state;
    const isBranchMatching = !branch || branch === branchId;

    if (isCityMatching && isStateMatching && isBranchMatching) {
      if (!branchData[branchId]) {
        branchData[branchId] = { total_emergency_care_amount: 0.0, data: [] };
      }

      const eqpAmount = parseFloat(data.medical_equipment_amount);
      if (!isNaN(eqpAmount)) {
        branchData[branchId].total_emergency_care_amount += eqpAmount;
        branchData[branchId].data.push({
          branch: branchId,
          patient_id: data.patient_id,
          medical_equipment_amount: eqpAmount.toFixed(2),
        });

        if (!totalSumEmergencyEqp[branchId]) {
          totalSumEmergencyEqp[branchId] = 0.0;
        }
        totalSumEmergencyEqp[branchId] += eqpAmount;
      }
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    let totalSum = 0.0;
    for (const branchId in totalSumEmergencyEqp) {
      totalSum += totalSumEmergencyEqp[branchId];
    }
    response.push({ total_emergency_care_amount: totalSum.toFixed(2) });

    for (const branchId in branchData) {
      const branchResponse = {
        branch: branchId,
        total_emergency_care_amount: branchData[branchId].total_emergency_care_amount.toFixed(2),
        data: branchData[branchId].data,
      };
      response.push(branchResponse);
    }

    res.json(response);
  });
});



app.get('/fb', (req, res) => {
  const { branch, start, end, city, state } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientFBDataPath = 'datas/patient_activity_fb.json';
  const masterBranches = JSON.parse(fs.readFileSync('datas/master_branches.json'));

  const branchData = {};
  let totalSumFBAmount = 0.0;

  const fileStream = fs.createReadStream(patientFBDataPath, { encoding: 'utf8' });
  const jsonStream = JSONStream.parse('*');

  fileStream.pipe(jsonStream);

  jsonStream.on('data', (data) => {
    if (!data) {
      return;
    }

    const branchId = usersData.find((user) => user.id === data.patient_id)?.branch_id;
    if (!branchId) {
      return;
    }

    const branchInfo = masterBranches.find((branch) => branch.id === branchId);

    if (
      (!city || branchInfo.branch_city_id == city) &&
      (!state || branchInfo.branch_state_id == state)
    ) {
      if (!branchData[branchId]) {
        branchData[branchId] = { total_fb_amount: 0.0, data: [] };
      }

      const activityDate = new Date(data.created_at);
      if (
        (!start || activityDate >= new Date(start)) &&
        (!end || activityDate <= new Date(end))
      ) {
        branchData[branchId].total_fb_amount += parseFloat(data.fb_amount);
        branchData[branchId].data.push({
          patient_id: data.patient_id,
          fb_amount: data.fb_amount,
        });
        totalSumFBAmount += parseFloat(data.fb_amount);
      }
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        const branchResponse = {
          branch,
          total_fb_amount: branchData[branch].total_fb_amount.toFixed(2),
          data: branchData[branch].data,
        };
        response.push(branchResponse);
        const totalBranchSum = branchData[branch].total_fb_amount.toFixed(2);
        response.unshift({ branch, total_fb_amount: totalBranchSum });
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        const branchResponse = {
          branch: branchId,
          total_fb_amount: branchData[branchId].total_fb_amount.toFixed(2),
          data: branchData[branchId].data,
        };
        response.push(branchResponse);
      }
      response.unshift({ total_fb_amount: totalSumFBAmount.toFixed(2) });
    }

    res.json(response);
  });
});


app.get('/personal_care', (req, res) => {
  const { branch, start, end, city, state } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientPersonalCareDataPath = 'datas/patient_activity_personal_care_service.json';
  const masterBranches = JSON.parse(fs.readFileSync('datas/master_branches.json'));

  const branchData = {};
  let totalSumPersonalCare = 0.0;

  const fileStream = fs.createReadStream(patientPersonalCareDataPath, { encoding: 'utf8' });
  const jsonStream = JSONStream.parse('*');

  fileStream.pipe(jsonStream);

  jsonStream.on('data', (data) => {
    if (!data) {
      return;
    }

    const branchId = usersData.find((user) => user.id === data.patient_id)?.branch_id;
    if (!branchId) {
      return;
    }

    const branchInfo = masterBranches.find((branch) => branch.id === branchId);

    if (
      (!city || branchInfo.branch_city_id == city) &&
      (!state || branchInfo.branch_state_id == state)
    ) {
      if (!branchData[branchId]) {
        branchData[branchId] = { total_sum_personal_care: 0.0, data: [] };
      }

      const activityDate = new Date(data.created_at);
      if (
        (!start || activityDate >= new Date(start)) &&
        (!end || activityDate <= new Date(end))
      ) {
        branchData[branchId].total_sum_personal_care += parseFloat(data.personal_care_amount);
        branchData[branchId].data.push({
          patient_id: data.patient_id,
          personal_care_amount: parseFloat(data.personal_care_amount).toFixed(2),
        });
        totalSumPersonalCare += parseFloat(data.personal_care_amount);
      }
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        const branchResponse = {
          branch,
          total_sum_personal_care: branchData[branch].total_sum_personal_care.toFixed(2),
          data: branchData[branch].data,
        };
        response.push(branchResponse);
        const totalBranchSum = branchData[branch].total_sum_personal_care.toFixed(2);
        response.unshift({ branch, total_sum_personal_care: totalBranchSum });
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        const branchResponse = {
          branch: branchId,
          total_sum_personal_care: branchData[branchId].total_sum_personal_care.toFixed(2),
          data: branchData[branchId].data,
        };
        response.push(branchResponse);
      }
      response.unshift({ total_sum_personal_care: totalSumPersonalCare.toFixed(2) });
    }

    res.json(response);
  });
});


app.get('/procedural_service', (req, res) => {
  const { branch, start, end, city, state } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientProcedureServiceDataPath = 'datas/patient_activity_procedure_service.json';
  const masterBranches = JSON.parse(fs.readFileSync('datas/master_branches.json'));

  const branchData = {};
  const totalBranchSum = {};

  const fileStream = fs.createReadStream(patientProcedureServiceDataPath, { encoding: 'utf8' });
  const jsonStream = JSONStream.parse('*');

  fileStream.pipe(jsonStream);

  jsonStream.on('data', (data) => {
    if (!data) {
      return;
    }

    const branchId = usersData.find((user) => user.id === data.patient_id)?.branch_id;
    if (!branchId) {
      return;
    }

    const branchInfo = masterBranches.find((branch) => branch.id === branchId);

    if (
      (!city || branchInfo.branch_city_id == city) &&
      (!state || branchInfo.branch_state_id == state)
    ) {
      if (!branchData[branchId]) {
        branchData[branchId] = { total_procedure_service_amount: 0.0, data: [] };
      }

      const activityDate = new Date(data.created_at);
      if (
        (!start || activityDate >= new Date(start)) &&
        (!end || activityDate <= new Date(end))
      ) {
        branchData[branchId].total_procedure_service_amount += parseFloat(data.procedure_service_amount);
        branchData[branchId].data.push({
          patient_id: data.patient_id,
          procedure_service_amount: data.procedure_service_amount,
        });
      }
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        const branchResponse = {
          branch,
          total_procedure_service_amount: branchData[branch].total_procedure_service_amount.toFixed(2),
          data: branchData[branch].data,
        };
        response.push(branchResponse);
        const totalBranchSum = branchData[branch].total_procedure_service_amount.toFixed(2);
        response.unshift({ branch, total_procedure_service_amount: totalBranchSum });
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        response.push({
          branch: branchId,
          total_procedure_service_amount: branchData[branchId].total_procedure_service_amount.toFixed(2),
          data: branchData[branchId].data,
        });
        const totalSumBranch = branchData[branchId].total_procedure_service_amount.toFixed(2);
        if (!totalBranchSum[branchId]) {
          totalBranchSum[branchId] = 0.0;
        }
        totalBranchSum[branchId] += parseFloat(totalSumBranch);
      }

      const totalSumProcedureService = response.reduce((sum, branch) => sum + parseFloat(branch.total_procedure_service_amount), 0).toFixed(2);
      response.unshift({ total_procedure_service_amount: totalSumProcedureService });
    }

    res.json(response);
  });
});

app.get('/patient_advance', (req, res) => {
  const { branch, start, end, city, state } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientAdvanceDataPath = 'datas/patient_activity_advance.json';
  const masterBranches = JSON.parse(fs.readFileSync('datas/master_branches.json'));

  const branchData = {};
  let totalSumActivityRate = 0.0;

  const fileStream = fs.createReadStream(patientAdvanceDataPath, { encoding: 'utf8' });
  const jsonStream = JSONStream.parse('*');

  fileStream.pipe(jsonStream);

  jsonStream.on('data', (data) => {
    if (!data) {
      return;
    }

    const branchId = usersData.find((user) => user.id === data.patient_id)?.branch_id;
    if (!branchId) {
      return;
    }

    const branchInfo = masterBranches.find((branch) => branch.id === branchId);

    if (
      (!city || branchInfo.branch_city_id == city) &&
      (!state || branchInfo.branch_state_id == state)
    ) {
      if (!branchData[branchId]) {
        branchData[branchId] = { total_activity_rate: 0.0, data: [] };
      }

      const activityDate = new Date(data.created_at);
      if (
        (!start || activityDate >= new Date(start)) &&
        (!end || activityDate <= new Date(end))
      ) {
        const activityRate = parseFloat(data.activity_rate);
        if (!isNaN(activityRate)) {
          branchData[branchId].total_activity_rate += activityRate;
          branchData[branchId].data.push({
            patient_id: data.patient_id,
            activity_rate: activityRate.toFixed(2),
          });
        }
      }
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        const branchResponse = {
          branch,
          total_activity_rate: branchData[branch].total_activity_rate.toFixed(2),
          data: branchData[branch].data,
        };
        response.push(branchResponse);
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        response.push({
          branch: branchId,
          total_activity_rate: branchData[branchId].total_activity_rate.toFixed(2),
          data: branchData[branchId].data,
        });
        totalSumActivityRate += branchData[branchId].total_activity_rate;
      }

      response.unshift({ total_activity_rate: totalSumActivityRate.toFixed(2) });
    }

    res.json(response);
  });
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

app.get('/bill_invoice', (req, res) => {
  const { branch, start, end, status, city, state } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const billInvoiceDataPath = 'datas/bill_invoices.json';
  const masterBranches = JSON.parse(fs.readFileSync('datas/master_branches.json'));

  const branchData = {};
  const totalBranchSum = {};

  const fileStream = fs.createReadStream(billInvoiceDataPath, { encoding: 'utf8' });
  const jsonStream = JSONStream.parse('*');

  fileStream.pipe(jsonStream);

  jsonStream.on('data', (data) => {
    if (!data) {
      return;
    }

    const branchId = usersData.find((user) => user.id === data.patient_id)?.branch_id;
    if (!branchId) {
      return;
    }

    const branchInfo = masterBranches.find((branch) => branch.id === branchId);

    if (
      (!city || branchInfo.branch_city_id == city) &&
      (!state || branchInfo.branch_state_id == state)
    ) {
      if (!branchData[branchId]) {
        branchData[branchId] = { branch_total_amount: 0, data: [] };
      }

      const activityDate = new Date(data.created_at);
      if (
        (!start || activityDate >= new Date(start)) &&
        (!end || activityDate <= new Date(end))
      ) {
        branchData[branchId].branch_total_amount += parseFloat(data.total_amount);
        branchData[branchId].data.push({
          patient_id: data.patient_id,
          total_amount: data.total_amount,
        });
        if (!totalBranchSum[branchId]) {
          totalBranchSum[branchId] = 0.0;
        }
        totalBranchSum[branchId] += parseFloat(data.total_amount);
      }
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        response.push({
          branch: branch,
          branch_total_amount: branchData[branch].branch_total_amount.toFixed(2),
          data: branchData[branch].data,
        });
        const totalBranchSumValue = branchData[branch].branch_total_amount.toFixed(2);
        response.unshift({ branch: branch, total_total_amount: totalBranchSumValue });
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        response.push({
          branch: branchId,
          branch_total_amount: branchData[branchId].branch_total_amount.toFixed(2),
          data: branchData[branchId].data,
        });
        const totalBranchSumValue = totalBranchSum[branchId].toFixed(2);
        if (!totalBranchSumValue) {
          totalBranchSumValue = 0.0;
        }
        response.unshift({ branch: branchId, total_total_amount: totalBranchSumValue });
      }

      const totalTotalAmount = response
        .filter((item) => !item.data)
        .reduce((sum, branch) => sum + parseFloat(branch.total_total_amount), 0)
        .toFixed(2);
      response.unshift({ total_total_amount: totalTotalAmount });
    }

    res.json(response);
  });
});

app.get('/staff_extra_service', (req, res) => {
  const { branch, start, end, city, state } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientActivityDataPath = 'datas/patient_activity_staff_extra_service.json';
  const masterBranches = JSON.parse(fs.readFileSync('datas/master_branches.json'));

  const branchData = {};
  const totalBranchSum = {};

  const fileStream = fs.createReadStream(patientActivityDataPath, { encoding: 'utf8' });
  const jsonStream = JSONStream.parse('*');

  fileStream.pipe(jsonStream);

  jsonStream.on('data', (data) => {
    if (!data) {
      return;
    }

    const branchId = usersData.find((user) => user.id === data.patient_id)?.branch_id;
    if (!branchId) {
      return;
    }

    const branchInfo = masterBranches.find((branch) => branch.id === branchId);

    if (
      (!city || branchInfo.branch_city_id == city) &&
      (!state || branchInfo.branch_state_id == state)
    ) {
      if (!branchData[branchId]) {
        branchData[branchId] = { total_extra_service_amount: 0.0, data: [] };
      }

      const activityDate = new Date(data.created_at);
      if (
        (!start || activityDate >= new Date(start)) &&
        (!end || activityDate <= new Date(end))
      ) {
        branchData[branchId].total_extra_service_amount += parseFloat(data.extra_service_amount);
        branchData[branchId].data.push({
          patient_id: data.patient_id,
          extra_service_amount: data.extra_service_amount,
        });
      }
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        const branchResponse = {
          branch,
          total_extra_service_amount: branchData[branch].total_extra_service_amount.toFixed(2),
          data: branchData[branch].data,
        };
        response.push(branchResponse);
        const totalBranchSum = branchData[branch].total_extra_service_amount.toFixed(2);
        response.unshift({ branch, total_extra_service_amount: totalBranchSum });
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        response.push({
          branch: branchId,
          total_extra_service_amount: branchData[branchId].total_extra_service_amount.toFixed(2),
          data: branchData[branchId].data,
        });
        const totalSumBranch = branchData[branchId].total_extra_service_amount.toFixed(2);
        if (!totalBranchSum[branchId]) {
          totalBranchSum[branchId] = 0.0;
        }
        totalBranchSum[branchId] += parseFloat(totalSumBranch);
      }

      const totalSumExtraService = response.reduce((sum, branch) => sum + parseFloat(branch.total_extra_service_amount), 0).toFixed(2);
      response.unshift({ total_extra_service_amount: totalSumExtraService });
    }

    res.json(response);
  });
});

app.get('/patient_activity_tax', (req, res) => {
  const { start, end, branch } = req.query;
  const patientActivityData = JSON.parse(fs.readFileSync('datas/patient_activity_staff_extra_service.json'));

  const branchData = {};

  patientActivityData.forEach((activity) => {
    const activityDate = new Date(activity.created_at);
    if (activityDate >= new Date(start) && activityDate <= new Date(end)) {
      const branchId = activity.branch_id || 'undefined';
      if (!branchData[branchId]) {
        branchData[branchId] = { total_tax_rate: 0, data: [] };
      }

      const taxRate = activity.tax_rate || 0;
      branchData[branchId].total_tax_rate += parseFloat(taxRate); 
      branchData[branchId].data.push({
        activity_id: activity.id,
        tax_rate: taxRate,
      });
    }
  });

  let response = [];

  if (!branch) {
    for (const branchId in branchData) {
      response.push({
        branch: branchId === 'undefined' ? 'All Branches' : branchId,
        total_tax_rate: branchData[branchId].total_tax_rate.toFixed(2),
        data: branchData[branchId].data,
      });
    }
  } else {
    if (branchData[branch]) {
      response.push({
        branch: branch,
        total_tax_rate: branchData[branch].total_tax_rate.toFixed(2),
        data: branchData[branch].data,
      });
    } else {
      return res.status(404).json({ message: 'No data found for the given branch' });
    }
  }

  const totalSumTaxRate = response.reduce((sum, branch) => sum + parseFloat(branch.total_tax_rate), 0).toFixed(2);
  response.unshift({ total_tax_rate: totalSumTaxRate });

  res.json(response);
});

app.listen(port, () => {
  console.log('Server has been started on', port, "http://localhost:8080");
});
