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
