
// Função para adicionar usuário
async function adicionarFuncionario() {
    const nome = document.getElementById('nome').value;
    const genero = document.getElementById('genero').value;

    const response = await fetch('http://localhost:3000/funcionarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, genero }),
    });

    const result = await response.json();
    alert(result);
    carregarFuncionarios();
  }

  // Função para carregar usuários
  async function carregarFuncionarios() {
    const response = await fetch('http://localhost:3000/funcionarios');
    const funcionarios = await response.json();

    const funcionariosBody = document.getElementById('funcionariosBody');
    funcionariosBody.innerHTML = '';

    funcionarios.forEach(funcionario => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${funcionario.id}</td><td>${funcionario.nome}</td><td>${funcionario.genero}</td><td><button onclick="editarFuncionario(${funcionario.id})">Editar</button><button onclick="apagarFuncionario(${funcionario.id})">Apagar</button></td>`;
      funcionariosBody.appendChild(row);
    });
  }

  // Função para editar funcionario (neste exemplo, você pode implementar um formulário de edição)
  function editarFuncionario(id) {
    alert(`Editar funcionário com ID ${id}`);
  }

  // Função para apagar funcionario
  async function apagarFuncionario(id) {
    const response = await fetch(`http://localhost:3000/funcionarios/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    alert(result);
    carregarFuncionarios();
  }

  // Carregar funcionarios quando a página carregar
  window.onload = carregarFuncionarios;