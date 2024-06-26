class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarAtendimentos();
  };

  criarAtendimentos() {
    const query = "CREATE TABLE IF NOT EXISTS tbl_atendimentos (id INT NOT NULL AUTO_INCREMENT, cliente VARCHAR(100) NOT NULL, pet VARCHAR(20), servico VARCHAR(20), dataConsulta DATETIME NOT NULL, dataCriacao DATETIME NOT NULL, status VARCHAR(20) NOT NULL, observacoes TINYTEXT, PRIMARY KEY (id));";
    
    this.conexao.query(query, 
      (err) => {
        if (err) { console.log(err) }
    })
  }
  
}

module.exports = new Tabelas;