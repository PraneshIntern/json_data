// const fs = require('fs').promises;
const express = require('express');
const { existsSync } = require('fs');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const cron = require('node-cron');
const readline = require('readline');
const JSONStream = require('JSONStream')

const app = express();
const port = 8080;

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
app.get('/emergency_eqp', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientEmergencyEqpDataPath = 'datas/patient_activity_medical_euipments.json';

  const branchData = {};
  const totalSumEmergencyEqp = 0;

  const fileStream = fs.createReadStream(patientEmergencyEqpDataPath, { encoding: 'utf8' });
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

    if (!branchData[branchId]) {
      branchData[branchId] = { total_emergency_care_amount: 0, data: [] };
    }

    const activityDate = new Date(data.created_at);
    if (
      (!start || activityDate >= new Date(start)) &&
      (!end || activityDate <= new Date(end))
    ) {
      branchData[branchId].total_emergency_care_amount += data.medical_equipment_amount;
      branchData[branchId].data.push({
        patient_id: data.patient_id,
        medical_equipment_amount: data.medical_equipment_amount,
      });
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        response.push({ branch: branch, data: branchData[branch].data });
        const totalSumEmergencyEqpAmount = branchData[branch].total_emergency_care_amount;
        response.unshift({ branch: branch, total_emergency_care_amount: totalSumEmergencyEqpAmount });
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        response.push({ branch: branchId, data: branchData[branchId].data });
      }
      const totalSumEmergencyEqpAmount = response.reduce((sum, branch) => sum + branchData[branch.branch].total_emergency_care_amount, 0);
      response.unshift({ total_emergency_care_amount: totalSumEmergencyEqpAmount });
    }

    res.json(response);
  });
});





app.get('/fb', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientFBDataPath = 'datas/patient_activity_fb.json';

  const branchData = {};
  const totalSumFB = 0;

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

    if (!branchData[branchId]) {
      branchData[branchId] = { total_fb_amount: 0, data: [] };
    }

    const activityDate = new Date(data.created_at);
    if (
      (!start || activityDate >= new Date(start)) &&
      (!end || activityDate <= new Date(end))
    ) {
      branchData[branchId].total_fb_amount += data.fb_amount;
      branchData[branchId].data.push({
        patient_id: data.patient_id,
        fb_amount: data.fb_amount,
      });
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        response.push({ branch: branch, data: branchData[branch].data });
        const totalSumFBAmount = branchData[branch].total_fb_amount;
        response.unshift({ branch: branch, fb_amount: totalSumFBAmount });
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        response.push({ branch: branchId, data: branchData[branchId].data });
      }
      const totalSumFBAmount = response.reduce((sum, branch) => sum + branchData[branch.branch].total_fb_amount, 0);
      response.unshift({ fb_amount: totalSumFBAmount });
    }

    res.json(response);
  });
});


app.get('/personal_care', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientPersonalCareDataPath = 'datas/patient_activity_personal_care_service.json';

  const branchData = {};
  const totalSumPersonalCare = 0;

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

    if (!branchData[branchId]) {
      branchData[branchId] = { total_sum_personal_care: 0, data: [] };
    }

    const activityDate = new Date(data.created_at);
    if (
      (!start || activityDate >= new Date(start)) &&
      (!end || activityDate <= new Date(end))
    ) {
      branchData[branchId].total_sum_personal_care += data.personal_care_amount;
      branchData[branchId].data.push({
        index: data.patient_id,
        personal_care_amount: data.personal_care_amount,
      });
    }
  });

  jsonStream.on('end', () => {
    const response = {};

    if (branch) {
      if (branchData[branch]) {
        response.branch = branch;
        response.total_sum_personal_care = branchData[branch].total_sum_personal_care;
        response.data = branchData[branch].data;
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      response.total_sum_personal_care = totalSumPersonalCare;
      response.branches = [];

      for (const branchId in branchData) {
        response.total_sum_personal_care += branchData[branchId].total_sum_personal_care;
        response.branches.push({
          branch: branchId,
          data: branchData[branchId].data,
        });
      }
    }

    res.json(response);
  });
});







app.get('/procedural_service', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientProcedureServiceDataPath = 'datas/patient_activity_procedure_service.json';

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

    if (!branchData[branchId]) {
      branchData[branchId] = { total_procedure_service_amount: 0, data: [] };
    }

    const activityDate = new Date(data.created_at);
    if (
      (!start || activityDate >= new Date(start)) &&
      (!end || activityDate <= new Date(end))
    ) {
      branchData[branchId].total_procedure_service_amount += data.procedure_service_amount;
      branchData[branchId].data.push({
        patient_id: data.patient_id,
        procedure_service_amount: data.procedure_service_amount,
      });
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        const branchResponse = {
          branch,
          total_procedure_service_amount: branchData[branch].total_procedure_service_amount,
          data: branchData[branch].data,
        };
        response.push(branchResponse);
        const totalBranchSum = branchData[branch].total_procedure_service_amount;
        response.unshift({ branch, total_procedure_service_amount: totalBranchSum });
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        response.push({
          branch: branchId,
          total_procedure_service_amount: branchData[branchId].total_procedure_service_amount,
          data: branchData[branchId].data,
        });
        const totalSumBranch = branchData[branchId].total_procedure_service_amount;
        if (!totalBranchSum[branchId]) {
          totalBranchSum[branchId] = 0;
        }
        totalBranchSum[branchId] += totalSumBranch;
      }

      const totalSumProcedureService = response.reduce((sum, branch) => sum + branch.total_procedure_service_amount, 0);
      response.unshift({ total_procedure_service_amount: totalSumProcedureService });
    }

    res.json(response);
  });
});



app.get('/patient_advance', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientAdvanceDataPath = 'datas/patient_activity_advance.json';

  const branchData = {};
  const totalBranchSum = {};

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

    if (!branchData[branchId]) {
      branchData[branchId] = { total_activity_rate: 0, data: [] };
    }

    const activityDate = new Date(data.created_at);
    if (
      (!start || activityDate >= new Date(start)) &&
      (!end || activityDate <= new Date(end))
    ) {
      branchData[branchId].total_activity_rate += data.activity_rate;
      branchData[branchId].data.push({
        patient_id: data.patient_id,
        activity_rate: data.activity_rate,
      });
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        const branchResponse = {
          branch,
          total_activity_rate: branchData[branch].total_activity_rate,
          data: branchData[branch].data,
        };
        response.push(branchResponse);
        const totalBranchSum = branchData[branch].total_activity_rate;
        response.unshift({ branch, total_branch_sum: totalBranchSum });
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        response.push({
          branch: branchId,
          total_activity_rate: branchData[branchId].total_activity_rate,
          data: branchData[branchId].data,
        });
        const totalSumBranch = branchData[branchId].total_activity_rate;
        if (!totalBranchSum[branchId]) {
          totalBranchSum[branchId] = 0;
        }
        totalBranchSum[branchId] += totalSumBranch;
      }

      const totalSumActivityRate = response.reduce((sum, branch) => sum + branch.total_activity_rate, 0);
      response.unshift({ total_activity_rate: totalSumActivityRate });
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
  const { branch, start, end, status } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const billInvoiceDataPath = 'datas/bill_invoices.json';

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

    if (!branchData[branchId]) {
      branchData[branchId] = { total_total_amount: 0, data: [] };
    }

    const activityDate = new Date(data.created_at);
    if (
      (!start || activityDate >= new Date(start)) &&
      (!end || activityDate <= new Date(end))
    ) {
      branchData[branchId].total_total_amount += data.total_amount;
      branchData[branchId].data.push({
        patient_id: data.patient_id,
        total_amount: data.total_amount,
      });
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        const branchResponse = {
          branch,
          total_total_amount: branchData[branch].total_total_amount,
          data: branchData[branch].data,
        };
        response.push(branchResponse);
        const totalBranchSum = branchData[branch].total_total_amount;
        response.unshift({ branch, total_branch_sum: totalBranchSum });
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        response.push({
          branch: branchId,
          total_total_amount: branchData[branchId].total_total_amount,
          data: branchData[branchId].data,
        });
        const totalSumBranch = branchData[branchId].total_total_amount;
        if (!totalBranchSum[branchId]) {
          totalBranchSum[branchId] = 0;
        }
        totalBranchSum[branchId] += totalSumBranch;
      }

      const totalSumExtraService = response.reduce((sum, branch) => sum + branch.total_total_amount, 0);
      response.unshift({ total_total_amount: totalSumExtraService });
    }

    res.json(response);
  });
});


app.get('/staff_extra_service', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientActivityDataPath = 'datas/patient_activity_staff_extra_service.json';

  const branchData = {};

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

    if (!branchData[branchId]) {
      branchData[branchId] = { total_extra_service_amount: 0, data: [] };
    }

    const activityDate = new Date(data.created_at);
    if (
      (!start || activityDate >= new Date(start)) &&
      (!end || activityDate <= new Date(end))
    ) {
      branchData[branchId].total_extra_service_amount += data.extra_service_amount;
      branchData[branchId].data.push({
        patient_id: data.patient_id,
        extra_service_amount: data.extra_service_amount,
      });
    }
  });

  jsonStream.on('end', () => {
    const response = [];

    if (branch) {
      if (branchData[branch]) {
        const branchResponse = {
          branch,
          total_extra_service_amount: branchData[branch].total_extra_service_amount,
          data: branchData[branch].data,
        };
        response.push(branchResponse);
      } else {
        return res.status(404).json({ message: 'No data found for the given branch' });
      }
    } else {
      for (const branchId in branchData) {
        const branchResponse = {
          branch: branchId,
          total_extra_service_amount: branchData[branchId].total_extra_service_amount,
          data: branchData[branchId].data,
        };
        response.push(branchResponse);
      }
      const totalSumExtraService = response.reduce(
        (sum, branch) => sum + branch.total_extra_service_amount,
        0
      );
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
      const branchId = activity.branch_id;
      if (!branchData[branchId]) {
        branchData[branchId] = { total_tax_rate: 0 };
      }

      const taxRate = activity.tax_rate || 0; 
      branchData[branchId].total_tax_rate += taxRate;
    }
  });

  if (branch) {
    if (branchData[branch]) {
      res.json({ total_tax_rate: branchData[branch].total_tax_rate });
    } else {
      return res.status(404).json({ message: 'No data found for the given branch' });
    }
  } else {
    let totalSumTaxRate = 0;
    for (const branchId in branchData) {
      totalSumTaxRate += branchData[branchId].total_tax_rate;
    }

    res.json({ total_tax_rate: totalSumTaxRate });
  }
});







app.listen(port, () => {
  console.log('Server has been started on', port, "http://localhost:3000");
});
