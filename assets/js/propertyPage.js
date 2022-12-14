$('input[name="daterange"]').daterangepicker();

$(function () {
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "left",
    },
    function (start, end, label) {
      const fromDate = new Date(Date.parse(start));
      const toDate = new Date(Date.parse(end));
      var Difference_In_Time = toDate.getTime() - fromDate.getTime();
      var Difference_In_Days = Math.ceil(
        Difference_In_Time / (1000 * 3600 * 24)
      );
      $("#total-price").html(
        Difference_In_Days * $(".houses-details").attr("property-daily-price")
      );
    }
  );
});

$("#order-form").submit(function (event) {
  event.preventDefault();
  const userPriv = $(".display-username").attr("privileges");
  if (userPriv == 4) {
    alert("Please sign in first");
  } else {
    const guestCount = $("#guestCount").val();
    const dates = $("#daterange").val();
    const total = $("#total-price").html();
    const propertyId = $(".houses-details").attr("_id");
    const userId = $(".display-username").attr("userId");
    const data = {
      userId: userId,
      propertyId: propertyId,
      guestCount: guestCount,
      amount: total,
      dateFrom: dates.split(" - ")[0],
      dateTo: dates.split(" - ")[1],
    };
    console.log(data);
    $.ajax({
      type: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      dataType: "json",
      url: `http://localhost:3000/api/charges`,
      data: data,
      success: function (response) {
        alert("Success");
      },
    }).done;
  }
});
