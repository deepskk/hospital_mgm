document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add-btn");

  addButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const patientId = btn.getAttribute("data-patient-id");

      const modal = document.getElementById("medicineModal");
      const form = document.getElementById("medicineForm");
      const tableBody = document.getElementById("medicineList");

      document.getElementById("patientId").value = patientId;
      modal.style.display = "block";
      tableBody.innerHTML = "";

      const checkBtn = document.querySelector(`.check-btn[data-patient-id="${patientId}"]`);

      // Fetch existing medicines
      try {
        const res = await fetch(`/medical/patient/${patientId}`);
        const medicines = await res.json();

        medicines.forEach((med) => {
          const row = document.createElement("tr");

          row.innerHTML = `
            <td>${med.medicine_name}</td>
            <td>${med.price_medicine}</td>
            <td>
              <button class="update-med" onclick="updateMedicine(${med.medical_id}, '${med.medicine_name}', ${med.price_medicine})">✏️</button>
              <button class="delete-med" onclick="deleteMedicine(${med.medical_id}, ${patientId})">🗑️</button>
            </td>
          `;
          tableBody.appendChild(row);
        });

        // Check button logic
        if (checkBtn) {
          if (medicines.length > 0) {
            checkBtn.disabled = false;
            checkBtn.classList.add("checked");
            checkBtn.innerText = "✅";
          } else {
            checkBtn.disabled = true;
            checkBtn.classList.remove("checked");
            checkBtn.innerText = "✔️";
          }
        }
      } catch (err) {
        console.error("Failed to fetch medicines:", err);
      }

      // Handle form submit
      form.onsubmit = async (e) => {
        e.preventDefault();

        const data = {
          patient_id: patientId,
          medicine_name: form.medicine_name.value,
          price_medicine: form.price_medicine.value,
        };

        try {
          const response = await fetch("/medical/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            // Re-open modal to refresh list
            btn.click();
            btn.classList.add("active");
            btn.innerText = "✅";
            form.reset();
          } else {
            console.error("Failed to add medicine");
          }
        } catch (error) {
          console.error("Error submitting medicine:", error);
        }
      };
    });
  });

  // Close modal on outside click
  window.onclick = function (e) {
    const modal = document.getElementById("medicineModal");
    if (e.target == modal) modal.style.display = "none";
  };
});

function closeModal() {
  document.getElementById("medicineModal").style.display = "none";
}

// ✅ Update Medicine Function
async function updateMedicine(medicalId, oldName, oldPrice) {
  const medicine_name = prompt("Update medicine name:", oldName);
  const price_medicine = prompt("Update price:", oldPrice);

  if (medicine_name && price_medicine) {
    try {
      const res = await fetch(`/medical/update/${medicalId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicine_name, price_medicine }),
      });
      if (res.ok) location.reload();
      else alert("Update failed");
    } catch (err) {
      console.error("Update error:", err);
    }
  }
}

// ✅ Delete Medicine Function
async function deleteMedicine(medicalId, patientId) {
  if (confirm("Are you sure to delete this medicine?")) {
    try {
      const res = await fetch(`/medical/delete/${medicalId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Re-fetch modal for same patient
        document.querySelector(`.add-btn[data-patient-id="${patientId}"]`).click();
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  }
}
