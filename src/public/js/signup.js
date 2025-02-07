console.log("Signup frontend javascript file");

function validateSignupForm() {
  const memberNick = $(".member-nick").val(),
    memberEmail = $(".member-email").val(),
    memberCodeLink = $(".member-link").val(),
    memberPassword = $(".member-password").val(),
    confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberEmail === "" ||
    memberCodeLink === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs!");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Password differs, please check!");
    return false;
  }
  return true;
}
