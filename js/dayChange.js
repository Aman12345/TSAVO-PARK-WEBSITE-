//JavaScript for Day Change
var count = 1;

function handleDayChange(number) {
    count += number;
    if (count < 1) {
        count = 1;
        alert("Minimum 1 day is required.");
        return;
    }
    document.getElementById("number").value = count;
}