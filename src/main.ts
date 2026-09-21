import type { Temperature } from "./Temperature";
 
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
 
const API = "https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json";
 
let temperatures: Temperature[] = [];
 
document.addEventListener("DOMContentLoaded", () => {
    loadData();
 
    document.getElementById("ujAdatForm")?.addEventListener("submit", newData);
 
    document.getElementById("exportButton")?.addEventListener("click", exportData);
});
 
 
async function loadData() {
 
    const response = await fetch(API);
 
    if (!response.ok) {
        throw new Error("Invalid response");
    }
 
    const data: Temperature[] = await response.json();
 
    temperatures = data;
 
    showData();
}
 
 
function showData() {
 
    const tbody = document.getElementById("content") as HTMLTableSectionElement;
 
    tbody.textContent = "";
 
    for (const m of temperatures) {
 
        const tr = document.createElement("tr");
 
        if (m.temperature < 10) {
            tr.classList.add("cold");
        }
 
        if (m.temperature >= 30) {
            tr.classList.add("hot");
        }
 
        const tdDay = document.createElement("td");
        tdDay.textContent = m.day;
        tr.appendChild(tdDay);
 
        const tdTemperature = document.createElement("td");
        tdTemperature.textContent = m.temperature.toString() + " °C";
        tr.appendChild(tdTemperature);
 
        tbody.appendChild(tr);
    }
}
 
 
function newData(e: SubmitEvent) {
 
    e.preventDefault();
 
    const form = document.getElementById("ujAdatForm") as HTMLFormElement;
    const temperatureInput =document.getElementById("temperature") as HTMLInputElement;
    const days: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const date = new Date();

    const newTemperature: Temperature = {
        day: days[date.getDay()],
        temperature: Number(temperatureInput.value)
    };
 
    temperatures.push(newTemperature);
 
    showData();
 
    form.reset();
}
 
 
function exportData() {
 
    const textarea =document.getElementById("export") as HTMLTextAreaElement;
    textarea.value = JSON.stringify(temperatures, null, 2);
}