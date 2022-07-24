function getNFTData() {
  console.log(process.env.NEXT_APP_NFTPORT);
  fetch(
    "https://api.nftport.xyz/v0/nfts/0x7b1C1702A09521b4160f79f853b7F54ba6b35a59?chain=polygon&include=default",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "5029fae4-369c-44c8-8f2f-c1ee659e2c96",
        // Authorization: `${process.env.NEXT_APP_NFTPORT}`,
      },
    }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

export default getNFTData;
