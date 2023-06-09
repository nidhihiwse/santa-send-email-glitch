import React, { useEffect, useState } from "react"

const ErrorPage = () => {
  const errorMsg = {
    notRegisterd : "User is not registered",
    ageRestriction : "User age is above 10",
  }

  return (
    <div>
      <p>{errorMsg.notRegisterd}</p>
      <p>{errorMsg.ageRestriction}</p>
    </div>
  );
}

export default ErrorPage;