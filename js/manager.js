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
    allAdmin.forEach((admin) => {
      let newName = document.createElement("dd");
      newName.innerHTML = admin.name + "<span>></span>";

      var random = Math.floor(Math.random() * 3) + 1;
      let dlClass = ".dl" + random;
      const dl = document.querySelector(dlClass);
      dl.appendChild(newName);

      newName.addEventListener("click", () => {
        displayAdmin = admin.id;
        employee_img.src = "img\\img\\black man reading.jpg";
        adminName.value = admin.name;
        adminJob.value = admin.job;
        adminSalary.value = admin.salary;
        adminAge.value = admin.age;
        adminWorkTime.value = admin.workTime;
        adminStartTime.value = admin.joinDate;
        attendance.value = "";
        absenteeism.value = "";
        vacate.value = "";
        saveBtn.value = "";
      });
    });

    submitBtn.addEventListener("click", () => {
      $.ajax({
        url: "http://localhost:8080/admin/getAdminClockByIdAndDateRange",
        type: "get",
        data: {
          adminId: displayAdmin,
          startDate: startTime.value,
          endDate: endTime.value,
        },
        dataType: "json",
        success: function (resp) {
          console.log(resp);
          let getTimeInfo = resp.data;

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
        id: displayAdmin,
        name: adminName.value,
        job: adminJob.value,
        salary: adminSalary.value,
        age: adminAge.value,
        workTime: adminWorkTime.value,
        joinDate: adminStartTime.value,
      };

      console.log(JSON.stringify(changeInfo));
      //
      $.ajax({
        url: "http://localhost:8080/admin/updateAdmin",
        type: "post",
        cache: false,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        data: JSON.stringify(changeInfo),
        dataType: "json",
        success: function (resp) {
          console.log(resp);
        },
        error: function () {
          alert("请求错误");
        },
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
const financeTotal = document.querySelector(".finance-total input");

function removeAllChild(nodeName) {
  let node = document.querySelector(nodeName);
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

getAllFinanceBtn.addEventListener("click", function () {
  $.ajax({
    url: "http://localhost:8080/admin/getAllFinanceInfoByDateRange",
    type: "get",
    data: {
      startDate: financeStartTime.value,
      endDate: financeEndTime.value,
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      allFinance = resp.data.financeInfoList;
      financeTotal.value = resp.data.totalAmount + "元";

      removeAllChild(".finance-items");

      allFinance.forEach((finance) => {
        if (finance.type == 4) {
          let newFinance = document.createElement("div");
          newFinance.classList.add("finance-item");

          newFinance.innerHTML = `<span>员工工资</span>
          <span>时间：${finance.date}</span>
          <span>员工：${finance.adminName}</span>
          <span>月薪：${finance.salary}</span>
          <span>奖金：${finance.bonus}</span>
          <span id="finance-item-last">薪水支出：${finance.total}</span>`;

          financeBox.appendChild(newFinance);
        } else if (finance.type == 1) {
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
        } else if (finance.type == 3) {
          let newFinance = document.createElement("div");
          newFinance.classList.add("finance-item");

          newFinance.innerHTML = `<span>VIP销售</span>
          <span>时间：2023年4月7日</span>
          <span>用户：某某某</span>
          <span>类别：白金会员</span>
          <span>数量：3个月</span>
          <span id="finance-item-last">销售收入：700元</span>`;

          financeBox.appendChild(newFinance);
        } else if (finance.type == 2) {
          let newFinance = document.createElement("div");
          newFinance.classList.add("finance-item");

          newFinance.innerHTML = `<span>线下茶点销售</span>
          <span>时间：${finance.date}</span>
          <span>用户：${finance.userName}</span>
          <span>类别：${finance.dessertName}</span>
          <span>数量：${finance.buyNums}份</span>
          <span id="finance-item-last">销售收入：${finance.totalPrice}元</span>`;

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
    url: "http://localhost:8080/admin/getAdminBillByDateRang",
    type: "get",
    data: {
      startDate: financeStartTime.value,
      endDate: financeEndTime.value,
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      allFinance = resp.data.financeInfoList;
      financeTotal.value = resp.data.totalAmount + "元";

      removeAllChild(".finance-items");

      allFinance.forEach((finance) => {
        if (finance.type == 4) {
          let newFinance = document.createElement("div");
          newFinance.classList.add("finance-item");

          newFinance.innerHTML = `<span>员工工资</span>
          <span>时间：${finance.date}</span>
          <span>员工：${finance.adminName}</span>
          <span>月薪：${finance.salary}</span>
          <span>奖金：${finance.bonus}</span>
          <span id="finance-item-last">薪水支出：${finance.total}</span>`;

          financeBox.appendChild(newFinance);
        }
      });
    },
    error: function () {
      alert("请求错误");
    },
  });
});

getBookFinanceBtn.addEventListener("click", function () {
  $.ajax({
    url: "http://localhost:8080/admin/getAllFinanceInfoByDateRange",
    type: "get",
    data: {
      startDate: financeStartTime.value,
      endDate: financeEndTime.value,
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      allFinance = resp.data.financeInfoList;

      financeTotal.value = resp.data.totalAmount + "元";

      removeAllChild(".finance-items");

      allFinance.forEach((finance) => {
        if (finance.type == 1) {
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
        }
      });
    },
    error: function () {
      alert("请求错误");
    },
  });
});

getVipFinanceBtn.addEventListener("click", function () {
  $.ajax({
    url: "http://localhost:8080/admin/getAllFinanceInfoByDateRange",
    type: "get",
    data: {
      startDate: financeStartTime.value,
      endDate: financeEndTime.value,
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      allFinance = resp.data.financeInfoList;

      financeTotal.value = resp.data.totalAmount + "元";

      removeAllChild(".finance-items");

      allFinance.forEach((finance) => {
        if (finance.type == 3) {
          let newFinance = document.createElement("div");
          newFinance.classList.add("finance-item");

          newFinance.innerHTML = `<span>VIP销售</span>
          <span>时间：2023年4月7日</span>
          <span>用户：某某某</span>
          <span>类别：白金会员</span>
          <span>数量：3个月</span>
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

getDessertFinanceBtn.addEventListener("click", function () {
  $.ajax({
    url: "http://localhost:8080/admin/getAllFinanceInfoByDateRange",
    type: "get",
    data: {
      startDate: financeStartTime.value,
      endDate: financeEndTime.value,
    },
    dataType: "json",
    success: function (resp) {
      console.log(resp);
      allFinance = resp.data.financeInfoList;

      financeTotal.value = resp.data.totalAmount + "元";

      removeAllChild(".finance-items");

      allFinance.forEach((finance) => {
        if (finance.type == 2) {
          let newFinance = document.createElement("div");
          newFinance.classList.add("finance-item");

          newFinance.innerHTML = `<span>线下茶点销售</span>
          <span>时间：${finance.date}</span>
          <span>用户：${finance.userName}</span>
          <span>类别：${finance.dessertName}</span>
          <span>数量：${finance.buyNums}份</span>
          <span id="finance-item-last">销售收入：${finance.totalPrice}元</span>`;

          financeBox.appendChild(newFinance);
        }
      });
    },
    error: function () {
      alert("请求错误");
    },
  });
});
