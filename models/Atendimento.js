const conexao = require("./../infra/conexao");
const moment = require("moment");

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const dataConsulta = moment(atendimento.dataConsulta, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS");

    const dataEhValida = moment(dataConsulta).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        mensagem: "A data da consulta precisa se hoje ou uma data futura.",
        valido: dataEhValida,
      },
      {
        nome: "cliente",
        mensagem: "O nome do cliente precisa ser maior que 5 caracteres.",
        valido: clienteEhValido,
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, dataConsulta };

      const sql = "INSERT INTO tbl_atendimentos SET ?";
      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro);
          console.log(erro);
        } else {
          res.status(201).json(resultados);
          console.log(resultados);
        }
      });
    }
  }

  lista(resp) {
    const sql = "SELECT * FROM tbl_atendimentos";

    conexao.query(sql, (error, result) => {
      if (error) {
        resp.status(400).json(error);
      } else {
        resp.status(200).json(result);
      }
    });
  }

  buscarPorId(res, id) {
    let sql = "SELECT * FROM tbl_atendimentos WHERE id = ?";

    conexao.query(sql, id, (erro, result) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(result[0]);
      }
    });
  }

  altera(id, values, response) {
    if (values.dataConsulta) {
      values.dataConsulta = moment(values.dataConsulta, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS");
    }

    const sql = "UPDATE tbl_atendimentos SET ? WHERE id = ?";
    conexao.query(sql, [values, id], (error, result) => {
      if (error) {
        response.status(400).json(error);
      } else {
        response.status(200).json(result);
      }
    });
  }

  delete(id, res) {
    const sql = "DELETE FROM tbl_atendimentos WHERE id= ?";
    sql.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }
}

module.exports = new Atendimento();
