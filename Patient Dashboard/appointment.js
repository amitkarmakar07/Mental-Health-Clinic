document.addEventListener("DOMContentLoaded", () => {
    // Fetch appointments from localStorage
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const appointmentList = document.getElementById("appointment-list");

    // Check if there are any appointments
    if (appointments.length === 0) {
        appointmentList.innerHTML = "<p>No appointments found. Please book an appointment.</p>";
    } else {
        // Display each appointment
        appointments.forEach((appointment, index) => {
            const appointmentCard = document.createElement("div");
            appointmentCard.className = "card";
            appointmentCard.innerHTML = `
                <h3>Appointment ${index + 1}</h3>
                <p><strong>Name:</strong> ${appointment.name}</p>
                <p><strong>Mobile:</strong> ${appointment.mobile}</p>
                <p><strong>Disease:</strong> ${appointment.disease}</p>
                <p><strong>Day:</strong> ${appointment.day}</p>
                <p><strong>Time Slot:</strong> ${appointment.timeSlot}</p>
                <p><strong>Description:</strong> ${appointment.description}</p>
                <p><strong>Doctor:</strong> ${appointment.doctorName}</p>
                <p><strong>Fees:</strong> $${appointment.fees}</p>
            `;
            appointmentList.appendChild(appointmentCard);
        });
    }
});

function bookAppointment(doctor) {
    // Show the modal
    const modal = document.getElementById("appointmentModal");
    modal.style.display = "block";

    // Handle form submission
    document.getElementById("appointment-form").onsubmit = function(event) {
        event.preventDefault();

        // Get form data
        const name = document.getElementById("patient-name").value;
        const mobile = document.getElementById("mobile-number").value;
        const disease = document.getElementById("disease").value;
        const day = document.getElementById("appointment-day").value;
        const timeSlot = document.getElementById("time-slot").value;
        const description = document.getElementById("description").value;

        // Create appointment object
        const appointment = {
            name,
            mobile,
            disease,
            day,
            timeSlot,
            description,
            doctorName: doctor.name,
            fees: doctor.fees
        };

        // Save appointment to localStorage
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));

        alert("Booking Successful!");

        // Close modal
        modal.style.display = "none";

        // Redirect to appointment list page
        window.location.href = "appointment.html";
    };
}
