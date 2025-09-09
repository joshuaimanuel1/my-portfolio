// Inisialisasi AOS (Animate on Scroll)
AOS.init({
  duration: 1000,
  once: true,
});

// Inisialisasi Feather Icons
feather.replace();

// Animasi Ketik
new Typed("#typed-text", {
  strings: ["Software Engineer", "Web Developer", "UI/UX Enthusiast"],
  typeSpeed: 70,
  backSpeed: 50,
  loop: true,
  cursorChar: "_",
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Set tahun di footer secara dinamis
document.getElementById("year").textContent = new Date().getFullYear();

// Fetch Proyek dari GitHub API
const username = "joshuaimanuel1";
const projectList = document.getElementById("project-list");

async function fetchGitHubProjects() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const repos = await response.json();

    // Ambil 4 repositori teratas untuk memberi ruang bagi projek manual
    repos.slice(0, 4).forEach((repo, index) => {
      // Jangan tampilkan repo Eco-Hub dan monnecare-app karena sudah manual
      if (repo.name !== "Eco-Hub" && repo.name !== "monnecare-app") {
        const projectCard = `
                            <div class="card p-6 flex flex-col" data-aos="fade-up" data-aos-delay="${
                              (index + 2) * 100
                            }">
                                <h3 class="text-xl font-bold text-white mb-2">${
                                  repo.name
                                }</h3>
                                <p class="text-gray-400 mb-4 flex-grow">${
                                  repo.description || "Tidak ada deskripsi."
                                }</p>
                                <div class="mt-auto">
                                    <a href="${
                                      repo.html_url
                                    }" target="_blank" class="font-semibold accent-color hover:text-red-700 transition duration-300 inline-flex items-center">
                                        Lihat Kode <i data-feather="arrow-right" class="w-4 h-4 ml-1"></i>
                                    </a>
                                </div>
                            </div>
                        `;
        projectList.innerHTML += projectCard;
      }
    });

    feather.replace();
  } catch (error) {
    console.error("Gagal mengambil data dari GitHub:", error);
    projectList.insertAdjacentHTML(
      "beforeend",
      '<p class="text-center text-red-500 col-span-full">Gagal memuat projek dari GitHub.</p>'
    );
  }
}

fetchGitHubProjects();

// Fungsi Modal Sertifikat
const certificateModal = document.getElementById("certificate-modal");
const modalImage = document.getElementById("modal-image");

function openModal(imageUrl) {
  modalImage.src = imageUrl;
  certificateModal.classList.add("active");
}

function closeModal() {
  certificateModal.classList.remove("active");
}

// Fungsi Modal Proyek
function openProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("active");
  feather.replace(); // Re-initialize icons for the modal
}

function closeProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("active");
}
