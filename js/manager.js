let displayAdmin = -1;

$.ajax({
  url: "http://localhost:8080/admin/getAllAdmin",
  type: "get",
  dataType: "json",
  success: function (resp) {
    console.log(resp);
    let allAdmin = resp.data;

    const employee_img = document.querySelector(".employee-img");
    const adminName = document.querySelector(".adminName");
    const adminJob = document.querySelector(".adminJob");
    const adminSalary = document.querySelector(".adminSalary");
    const adminAge = document.querySelector(".adminAge");
    const adminWorkTime = document.querySelector(".adminWorkTime");
    const adminStartTime = document.querySelector(".adminStartTime");
    const startTime = document.querySelector(".startTime");
    const endTime = document.querySelector(".endTime");
    const submitBtn = document.querySelector(".employee-time button");
    const attendance = document.querySelector(".attendance");
    const absenteeism = document.querySelector(".absenteeism");
    const vacate = document.querySelector(".vacate");
    const saveBtn = document.querySelector(".changeBtn");

    let num = 0;
    allAdmin.array.forEach((admin) => {
      let newName = document.createElement("dd");
      newName.innerHTML = admin.name + "<span>></span>";

      var random = Math.floor(Math.random() * 3) + 1;
      let dlClass = ".dl" + random;
      const dl = document.querySelector(dlClass);
      dl.appendChild(newName);

      newName.addEventListener("click", () => {
        displayAdmin = admin.eid;
        employee_img.src = admin.imagePath;
        adminName.value = admin.name;
        adminJob.value = admin.job;
        adminSalary.value = admin.salary;
        adminAge.value = admin.age;
        adminWorkTime.value = admin.workTime;
        adminStartTime.value = admin.startTime;
        startTime.value = "";
        endTime.value = "";
        attendance.value = "";
        absenteeism.value = "";
        vacate.value = "";
        saveBtn.value = "";
      });

      submitBtn.addEventListener("click", () => {
        let submitInfo = {
          adminId: displayAdmin,
          startDate: startTime.value,
          endDate: endTime.value,
        };

        $.ajax({
          url: "http://localhost:8080/admin/getAdminClockByDate",
          type: "get",
          data: submitInfo,
          dataType: "json",
          success: function (resp) {
            console.log(resp);
            let getTimeInfo = resp.date;

            attendance.value = getTimeInfo.absentTimes;
            absenteeism.value = getTimeInfo.clockInTimes;
            vacate.value = getTimeInfo.leaveTimes;
          },
          error: function () {
            alert("请求错误");
          },
        });
      });

      saveBtn.addEventListener("click", () => {
        let changeInfo = {
          eid: displayAdmin,
          name: adminName.value,
          job: adminJob.value,
          salary: adminSalary.value,
          age: adminAge.value,
          workTime: adminWorkTime.value,
          startTime: adminStartTime.value,
        };

        $.ajax({
          url: "http://localhost:8080/admin/saveAdminChange",
          type: "post",
          data: changeInfo,
          dataType: "json",
          success: function (resp) {
            console.log(resp);
          },
          error: function () {
            alert("请求错误");
          },
        });
      });
    });
  },
  error: function () {
    alert("请求错误");
  },
});

const getAllFinanceBtn = document.querySelector(".getAllFinanceBtn");
const getAdminFinanceBtn = document.querySelector(".getAdminFinanceBtn");
const getBookFinanceBtn = document.querySelector(".getBookFinanceBtn");
const getVipFinanceBtn = document.querySelector(".getVipFinanceBtn");
const getDessertFinanceBtn = document.querySelector(".getDessertFinanceBtn");

const financeStartTime = document.querySelector(".financeStartTime");
const financeEndTime = document.querySelector(".financeEndTime");

const financeBox = document.querySelector(".finance-items");

function removeAllChild(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

getAllFinanceBtn.addEventListener("click", function () {
  $.ajax({
    url: "http://localhost:8080/user/createUser",
    type: "get",
    data: {
      startTime: financeStartTime.value,
      endTime: financeEndTime.value,
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      allFinance = resp.data;

      removeAllChild(financeBox);

      allFinance.array.forEach((finance) => {
        if (finance.class == 0) {
          let newFinance = document.createElement("div");
          newFinance.classList.add("finance-item");

          newFinance.innerHTML = `<span>员工工资</span>
          <span>时间：2023年4月7日</span>
          <span>员工：某某某</span>
          <span>月薪：5000元</span>
          <span>奖金：2543元</span>
          <span>罚款：760元</span>
          <span id="finance-item-last">薪水支出：5000元</span>`;

          financeBox.appendChild(newFinance);
        } else if (finance.class == 1) {
          let newFinance = document.createElement("div");
          newFinance.classList.add("finance-item");

          newFinance.innerHTML = `<span>图书销售</span>
          <span>时间：2023年4月7日</span>
          <span>用户：某某某</span>
          <span>书名：某某</span>
          <span>类别：电子书</span>
          <span>数量：3份</span>
          <span id="finance-item-last">销售收入：25元</span>`;

          financeBox.appendChild(newFinance);
        } else if (finance.class == 2) {
          let newFinance = document.createElement("div");
          newFinance.classList.add("finance-item");

          newFinance.innerHTML = `<span>VIP销售</span>
          <span>时间：2023年4月7日</span>
          <span>用户：某某某</span>
          <span>类别：白金会员</span>
          <span>数量：3个月</span>
          <span id="finance-item-last">销售收入：700元</span>`;

          financeBox.appendChild(newFinance);
        } else if (finance.class == 3) {
          let newFinance = document.createElement("div");
          newFinance.classList.add("finance-item");

          newFinance.innerHTML = `<span>线下茶点销售</span>
          <span>时间：2023年4月7日</span>
          <span>用户：某某某</span>
          <span>类别：珍珠奶茶</span>
          <span>数量：2份</span>
          <span id="finance-item-last">销售收入：700元</span>`;

          financeBox.appendChild(newFinance);
        }
      });
    },
    error: function () {
      alert("请求错误");
    },
  });
});

getAdminFinanceBtn.addEventListener("click", function () {
  $.ajax({
    url: "http://localhost:8080/user/createUser",
    type: "get",
    data: {
      startTime: financeStartTime.value,
      endTime: financeEndTime.value,
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      allFinance = resp.data;

      removeAllChild(financeBox);

      allFinance.array.forEach((finance) => {
        let newFinance = document.createElement("div");
        newFinance.classList.add("finance-item");

        newFinance.innerHTML = `<span>员工工资</span>
          <span>时间：2023年4月7日</span>
          <span>员工：某某某</span>
          <span>月薪：5000元</span>
          <span>奖金：2543元</span>
          <span>罚款：760元</span>
          <span id="finance-item-last">薪水支出：5000元</span>`;

        financeBox.appendChild(newFinance);
      });
    },
    error: function () {
      alert("请求错误");
    },
  });
});

getBookFinanceBtn.addEventListener("click", function () {
  $.ajax({
    url: "http://localhost:8080/user/createUser",
    type: "get",
    data: {
      startTime: financeStartTime.value,
      endTime: financeEndTime.value,
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      allFinance = resp.data;

      removeAllChild(financeBox);

      allFinance.array.forEach((finance) => {
        let newFinance = document.createElement("div");
        newFinance.classList.add("finance-item");

        newFinance.innerHTML = `<span>图书销售</span>
        <span>时间：2023年4月7日</span>
        <span>用户：某某某</span>
        <span>书名：某某</span>
        <span>类别：电子书</span>
        <span>数量：3份</span>
        <span id="finance-item-last">销售收入：25元</span>`;

        financeBox.appendChild(newFinance);
      });
    },
    error: function () {
      alert("请求错误");
    },
  });
});

getVipFinanceBtn.addEventListener("click", function () {
  $.ajax({
    url: "http://localhost:8080/user/createUser",
    type: "get",
    data: {
      startTime: financeStartTime.value,
      endTime: financeEndTime.value,
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      allFinance = resp.data;

      removeAllChild(financeBox);

      allFinance.array.forEach((finance) => {
        let newFinance = document.createElement("div");
        newFinance.classList.add("finance-item");

        newFinance.innerHTML = `<span>VIP销售</span>
        <span>时间：2023年4月7日</span>
        <span>用户：某某某</span>
        <span>类别：白金会员</span>
        <span>数量：3个月</span>
        <span id="finance-item-last">销售收入：700元</span>`;

        financeBox.appendChild(newFinance);
      });
    },
    error: function () {
      alert("请求错误");
    },
  });
});

getVipFinanceBtn.addEventListener("click", function () {
  $.ajax({
    url: "http://localhost:8080/user/createUser",
    type: "get",
    data: {
      startTime: financeStartTime.value,
      endTime: financeEndTime.value,
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      allFinance = resp.data;

      removeAllChild(financeBox);

      allFinance.array.forEach((finance) => {
        let newFinance = document.createElement("div");
        newFinance.classList.add("finance-item");

        newFinance.innerHTML = `<span>线下茶点销售</span>
        <span>时间：2023年4月7日</span>
        <span>用户：某某某</span>
        <span>类别：珍珠奶茶</span>
        <span>数量：2份</span>
        <span id="finance-item-last">销售收入：700元</span>`;

        financeBox.appendChild(newFinance);
      });
    },
    error: function () {
      alert("请求错误");
    },
  });
});
