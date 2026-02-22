// Uploaded image inside hoodie properly
imageUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = (evt) => {
            const img = new Image();
            img.onload = function() {

                const hoodieX = 70, hoodieY = 100, hoodieWidth = 120, hoodieHeight = 240;

                const imgRatio = img.width / img.height;
                const hoodieRatio = hoodieWidth / hoodieHeight;

                let newWidth, newHeight, offsetX, offsetY;

                if(imgRatio > hoodieRatio){
                    newWidth = hoodieWidth;
                    newHeight = hoodieWidth / imgRatio;
                    offsetX = hoodieX;
                    offsetY = hoodieY + (hoodieHeight - newHeight)/2;
                } else {
                    newHeight = hoodieHeight;
                    newWidth = hoodieHeight * imgRatio;
                    offsetX = hoodieX + (hoodieWidth - newWidth)/2;
                    offsetY = hoodieY;
                }

                svgImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", evt.target.result);
                svgImage.setAttribute("x", offsetX);
                svgImage.setAttribute("y", offsetY);
                svgImage.setAttribute("width", newWidth);
                svgImage.setAttribute("height", newHeight);
                svgImage.setAttribute("preserveAspectRatio", "xMidYMid meet");
            };
            img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
    }
});   // ✅ THIS WAS MISSING

// ---------------- CART ----------------

let total = 0;

function addToCart() {
    let price = parseInt(document.getElementById("price").innerText);
    total += price;

    document.getElementById("total").innerText = total;

    showPopup();
}

// POPUP FUNCTION
function showPopup() {
    let popup = document.getElementById("popup");
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}document.addEventListener("DOMContentLoaded", function () {

    const colorPicker = document.getElementById("colorPicker");

    colorPicker.addEventListener("input", function () {

        const color = this.value;

        // Pullover
        document.getElementById("pulloverBody").setAttribute("fill", color);
        document.getElementById("pulloverHood").setAttribute("fill", color);
        document.getElementById("leftSleeve").setAttribute("fill", color);
        document.getElementById("rightSleeve").setAttribute("fill", color);

        // Zipper
        document.getElementById("zipperBody").setAttribute("fill", color);
        document.getElementById("zipperHood").setAttribute("fill", color);
        document.getElementById("leftSleeveZ").setAttribute("fill", color);
        document.getElementById("rightSleeveZ").setAttribute("fill", color);

    });

});
function downloadDesign() {

    const svg = document.getElementById("tshirtSVG");

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "My_Hoodie_Design.svg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}