    const API_URL = "http://localhost:3000/api/sinhvien";
    const tableBody = document.querySelector("#StudentTable tbody");

    // thêm form nếu chưa có trên page
    let form = document.getElementById("studentForm");
    if (!form) {
    form = document.createElement('form');
    form.id = 'studentForm';
    form.innerHTML = `
        <input type="hidden" id="id">
        <input type="text" id="hoten" placeholder="Tên học viên" required>
        <input type="number" id="age" placeholder="Tuổi" required>
        <input type="text" id="className" placeholder="Lớp" required>
        <button type="submit">Lưu</button>
    `;
    document.body.insertBefore(form, document.querySelector("#StudentTable"));
    }

    async function loadStudents() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        tableBody.innerHTML = data.map((hv, index) => `
        <tr data-id="${hv.id}">
            <td>${index + 1}</td>
            <td class="col-hoten">${escapeHtml(hv.hoten)}</td>
            <td class="col-age">${hv.age}</td>
            <td class="col-class">${escapeHtml(hv.class)}</td>
            <td>
            <button class="btn-edit">Sửa</button>
            <button class="btn-delete">Xóa</button>
            </td>
        </tr>
        `).join('');
    } catch (err) {
        console.error('Lỗi loadStudents:', err);
    }
    }

    // escape để tránh lỗi khi hiển thị chuỗi chứa dấu nháy
    function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
    }

    // xử lý form submit (thêm hoặc sửa)
    form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const hoten = document.getElementById('hoten').value;
    const age = Number(document.getElementById('age').value);
    const className = document.getElementById('className').value;

    const body = { hoten, age, class: className };

    try {
        if (id) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const json = await res.json();
        console.log('PUT result', json);
        } else {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const json = await res.json();
        console.log('POST result', json);
        }
        form.reset();
        loadStudents();
    } catch (err) {
        console.error('Lỗi submit:', err);
    }
    });

    // event delegation cho sửa / xóa
    tableBody.addEventListener('click', async (e) => {
    const tr = e.target.closest('tr');
    if (!tr) return;
    const id = tr.dataset.id;

    if (e.target.classList.contains('btn-edit')) {
        // fill form with existing values
        document.getElementById('id').value = id;
        document.getElementById('hoten').value = tr.querySelector('.col-hoten').textContent;
        document.getElementById('age').value = tr.querySelector('.col-age').textContent;
        document.getElementById('className').value = tr.querySelector('.col-class').textContent;
        // scroll to form or focus
        document.getElementById('hoten').focus();
    }

    if (e.target.classList.contains('btn-delete')) {
        if (!confirm('Bạn có chắc muốn xóa?')) return;
        try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        const json = await res.json();
        console.log('DELETE result', json);
        loadStudents();
        } catch (err) {
        console.error('Lỗi delete:', err);
        }
    }
    });

    loadStudents();
