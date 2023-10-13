// const fs = require('fs').promises;
const express = require('express');
const { existsSync } = require('fs');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const cron = require('node-cron');

const app = express();
const port = 3000;

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


app.get('/emergency_eqp', (req, res) => {
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
      const branchResponse = {
        branch: branch,
        total_emergency_care_amount: branchData[branch].total_emergency_care_amount,
        data: branchData[branch].data.map((item, index) => ({ index, ...item })),
      };
      response.push(branchResponse);
    } else {
      return res.status(404).json({ message: 'No data found for the given branch' });
    }
  } else {
    for (const branchId in branchData) {
      const branchResponse = {
        branch: branchId,
        total_emergency_care_amount: branchData[branchId].total_emergency_care_amount,
        data: branchData[branchId].data.map((item, index) => ({ index, ...item })),
      };
      response.push(branchResponse);
    }

    const totalSumEmergencyCare = response.reduce((sum, branch) => sum + branch.total_emergency_care_amount, 0);
    response.unshift({ total_emergency_care_amount: totalSumEmergencyCare });
  }

  res.json(response);
});




// app.get('/fb', (req, res) => {
//   const { branch, start, end } = req.query;
//   const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
//   const patientActivityData = JSON.parse(fs.readFileSync('datas/patient_activity_fb.json'));

//   const branchData = {};

//   usersData.forEach((user) => {
//     const branchId = user.branch_id;
//     const userId = user.id;

//     if (!branchData[branchId]) {
//       branchData[branchId] = { total_fb_amount: 0, data: [] };
//     }

//     const filteredData = patientActivityData.filter((activity) => {
//       const activityDate = new Date(activity.created_at);
//       return userId === activity.patient_id && activityDate >= new Date(start) && activityDate <= new Date(end);
//     });

//     if (filteredData.length > 0) {
//       const totalAmount = filteredData.reduce((sum, activity) => sum + activity.fb_amount, 0);
//       branchData[branchId].total_fb_amount += totalAmount;
//       branchData[branchId].data.push({ patient_id: userId, fb_Amounts: totalAmount });
//     }
//   });

//   const response = [];

//   if (branch) {
//     if (branchData[branch]) {
//       response.push({ branch: branch, data: branchData[branch].data });
//       const totalSumEmergencyCare = branchData[branch].total_fb_amount;
//       response.unshift({ branch: branch, fb_Amounts: totalSumEmergencyCare });
//     } else {
//       return res.status(404).json({ message: 'No data found for the given branch' });
//     }
//   } else {
//     for (const branchId in branchData) {
//       response.push({ branch: branchId, data: branchData[branchId].data });
//     }
//     const totalSumEmergencyCare = response.reduce((sum, branch) => sum + branchData[branch.branch].total_fb_amount, 0);
//     response.unshift({ fb_Amounts: totalSumEmergencyCare });
//   }

//   res.json(response);
// });


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
      branchData[branchId].data.push({ index: userId, personal_care_amount: totalAmount });
    }
  });

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
    response.total_sum_personal_care = 0;
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



app.get('/staff_extra_service', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientActivityData = JSON.parse(fs.readFileSync('datas/patient_activity_staff_extra_service.json'));

  const branchData = {};

  usersData.forEach((user) => {
    const branchId = user.branch_id;
    if (!branchData[branchId]) {
      branchData[branchId] = { total_extra_service_amount: 0, data: [] };
    }

    const userId = user.id;
    const filteredData = patientActivityData.filter((activity) => {
      const activityDate = new Date(activity.created_at);
      return userId === activity.patient_id && activityDate >= new Date(start) && activityDate <= new Date(end);
    });

    if (filteredData.length > 0) {
      const totalAmount = filteredData.reduce((sum, activity) => sum + activity.extra_service_amount, 0);
      branchData[branchId].total_extra_service_amount += totalAmount;
      branchData[branchId].data.push({ patient_id: userId, extra_service_amount: totalAmount });
    }
  });

  const response = [];

  if (branch) {
    if (branchData[branch]) {
      const branchResponse = {
        branch: branch,
        total_extra_service_amount: branchData[branch].total_extra_service_amount,
        data: branchData[branch].data.map((item, index) => ({ index, ...item })),
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
        data: branchData[branchId].data.map((item, index) => ({ index, ...item })),
      };
      response.push(branchResponse);
    }

    const totalSumExtraService = response.reduce((sum, branch) => sum + branch.total_extra_service_amount, 0);
    response.unshift({ total_extra_service_amount: totalSumExtraService });
  }

  res.json(response);
});

app.get('/procedural_service', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientActivityData = JSON.parse(fs.readFileSync('datas/patient_activity_procedure_service.json'));

  const branchData = {};

  usersData.forEach((user) => {
    const branchId = user.branch_id;
    if (!branchData[branchId]) {
      branchData[branchId] = { total_procedure_service_amount: 0, data: [] };
    }

    const userId = user.id;
    const filteredData = patientActivityData.filter((activity) => {
      const activityDate = new Date(activity.created_at);
      return userId === activity.patient_id && activityDate >= new Date(start) && activityDate <= new Date(end);
    });

    if (filteredData.length > 0) {
      const totalAmount = filteredData.reduce((sum, activity) => sum + activity.procedure_service_amount, 0);
      branchData[branchId].total_procedure_service_amount += totalAmount;
      branchData[branchId].data.push({ patient_id: userId, procedure_service_amount: totalAmount });
    }
  });

  const response = [];

  if (branch) {
    if (branchData[branch]) {
      const branchResponse = {
        branch: branch,
        total_procedure_service_amount: branchData[branch].total_procedure_service_amount,
        data: branchData[branch].data.map((item, index) => ({ index, ...item })),
      };
      response.push(branchResponse);
    } else {
      return res.status(404).json({ message: 'No data found for the given branch' });
    }
  } else {
    for (const branchId in branchData) {
      const branchResponse = {
        branch: branchId,
        total_procedure_service_amount: branchData[branchId].total_procedure_service_amount,
        data: branchData[branchId].data.map((item, index) => ({ index, ...item })),
      };
      response.push(branchResponse);
    }

    const totalSumProcedureService = response.reduce((sum, branch) => sum + branch.total_procedure_service_amount, 0);
    response.unshift({ total_procedure_service_amount: totalSumProcedureService });
  }

  res.json(response);
});

app.get('/patient_activity', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientActivityData = JSON.parse(fs.readFileSync('datas/patient_activity_fb.json'));

  const branchData = {};

  usersData.forEach((user) => {
    const branchId = user.branch_id;
    if (!branchData[branchId]) {
      branchData[branchId] = { total_procedure_service_amount: 0, data: [] };
    }

    const userId = user.id;
    const filteredData = patientActivityData.filter((activity) => {
      const activityDate = new Date(activity.created_at);
      return userId === activity.patient_id && activityDate >= new Date(start) && activityDate <= new Date(end);
    });

    if (filteredData.length > 0) {
      const totalAmount = filteredData.reduce((sum, activity) => sum + activity.procedure_service_amount, 0);
      branchData[branchId].total_procedure_service_amount += totalAmount;
      branchData[branchId].data.push({ patient_id: userId, procedure_service_amount: totalAmount });
    }
  });

  const response = [];

  if (branch) {
    if (branchData[branch]) {
      const branchResponse = {
        branch: branch,
        total_procedure_service_amount: branchData[branch].total_procedure_service_amount,
        data: branchData[branch].data.map((item, index) => ({ index, ...item })),
      };
      response.push(branchResponse);
    } else {
      return res.status(404).json({ message: 'No data found for the given branch' });
    }
  } else {
    for (const branchId in branchData) {
      const branchResponse = {
        branch: branchId,
        total_procedure_service_amount: branchData[branchId].total_procedure_service_amount,
        data: branchData[branchId].data.map((item, index) => ({ index, ...item })),
      };
      response.push(branchResponse);
    }

    const totalSumProcedureService = response.reduce((sum, branch) => sum + branch.total_procedure_service_amount, 0);
    response.unshift({ total_procedure_service_amount: totalSumProcedureService });
  }

  res.json(response);
});

app.get('/patient_advance', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientActivityData = JSON.parse(fs.readFileSync('datas/patient_activity_advance.json'));

  const branchData = {};

  usersData.forEach((user) => {
    const branchId = user.branch_id;
    if (!branchData[branchId]) {
      branchData[branchId] = { total_activity_rate: 0, data: [] };
    }

    const userId = user.id;
    const filteredData = patientActivityData.filter((activity) => {
      const activityDate = new Date(activity.created_at);
      return userId === activity.patient_id && activityDate >= new Date(start) && activityDate <= new Date(end);
    });

    if (filteredData.length > 0) {
      const totalAmount = filteredData.reduce((sum, activity) => sum + activity.activity_rate, 0);
      branchData[branchId].total_activity_rate += totalAmount;
      branchData[branchId].data.push({ patient_id: userId, activity_rate: totalAmount });
    }
  });

  const response = [];

  if (branch) {
    if (branchData[branch]) {
      const branchResponse = {
        branch: branch,
        total_activity_rate: branchData[branch].total_activity_rate,
        data: branchData[branch].data.map((item, index) => ({ index, ...item })),
      };
      response.push(branchResponse);
    } else {
      return res.status(404).json({ message: 'No data found for the given branch' });
    }
  } else {
    for (const branchId in branchData) {
      const branchResponse = {
        branch: branchId,
        total_activity_rate: branchData[branchId].total_activity_rate,
        data: branchData[branchId].data.map((item, index) => ({ index, ...item })),
      };
      response.push(branchResponse);
    }

    const totalSumActivityRate = response.reduce((sum, branch) => sum + branch.total_activity_rate, 0);
    response.unshift({ total_activity_rate: totalSumActivityRate });
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



app.get('/bill_invoice', (req, res) => {
  const { branch, start, end } = req.query;
  const usersData = JSON.parse(fs.readFileSync('datas/users.json'));
  const patientActivityData = JSON.parse(fs.readFileSync('datas/bill_invoices.json'));

  const branchData = {};

  usersData.forEach((user) => {
    const branchId = user.branch_id;
    if (!branchData[branchId]) {
      branchData[branchId] = { total_total_amount: 0, data: [] };
    }

    const userId = user.id;
    const filteredData = patientActivityData.filter((activity) => {
      const activityDate = new Date(activity.created_at);
      return userId === activity.patient_id && activityDate >= new Date(start) && activityDate <= new Date(end);
    });

    if (filteredData.length > 0) {
      const totalAmount = filteredData.reduce((sum, activity) => sum + activity.total_amount, 0);
      branchData[branchId].total_total_amount += totalAmount;
      branchData[branchId].data.push({ patient_id: userId, total_amount: totalAmount });
    }
  });

  const response = [];

  if (branch) {
    if (branchData[branch]) {
      response.push({ branch: branch, data: branchData[branch].data });
      const totalSumExtraService = branchData[branch].total_total_amount;
      response.unshift({ branch: branch, total_ptotal_amount: totalSumExtraService });
    } else {
      return res.status(404).json({ message: 'No data found for the given branch' });
    }
  } else {
    for (const branchId in branchData) {
      response.push({ branch: branchId, data: branchData[branchId].data });
    }
    const totalSumExtraService = response.reduce((sum, branch) => sum + branchData[branch.branch].total_total_amount, 0);
    response.unshift({ total_total_amount: totalSumExtraService });
  }

  res.json(response);
});


app.listen(port, () => {
  console.log('Server has been started on', port, "http://localhost:3000");
});
