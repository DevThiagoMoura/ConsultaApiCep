import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import styles from "../styles/CepStyles";

export default function ConsultaCep() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Regex para validar CEP (XXXXX-XXX ou XXXXXXXX)
  const regexCep = /^\d{5}-?\d{3}$/;

  function handleCepChange(texto) {
    // aplica máscara dinâmica XXXXX-XXX
    const apenasNumeros = texto.replace(/\D/g, "");
    let cepFormatado = apenasNumeros;
    if (apenasNumeros.length > 5) {
      cepFormatado = apenasNumeros.slice(0, 5) + "-" + apenasNumeros.slice(5, 8);
    }
    setCep(cepFormatado);
  }

  async function buscarCep() {
    const cepLimpo = cep.replace("-", ""); // remove máscara
    if (!regexCep.test(cep)) {
      setErro("Digite um CEP válido (ex: 12345-678).");
      return;
    }

    setLoading(true);
    setErro("");
    setEndereco(null);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        setErro("CEP não encontrado!");
      } else {
        setEndereco(data);
      }
    } catch (e) {
      setErro("Erro ao buscar o CEP. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de CEP</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        keyboardType="numeric"
        maxLength={9} // XXXXX-XXX
        value={cep}
        onChangeText={handleCepChange}
      />

      <View style={{ marginTop: 10 }}>
        <Button title="Buscar" onPress={buscarCep} disabled={loading} />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {erro ? <Text style={styles.error}>{erro}</Text> : null}

      {endereco && (
        <View style={styles.result}>
          <Text><Text style={styles.label}>CEP:</Text> {endereco.cep}</Text>
          <Text><Text style={styles.label}>Logradouro:</Text> {endereco.logradouro}</Text>
          <Text><Text style={styles.label}>Bairro:</Text> {endereco.bairro}</Text>
          <Text><Text style={styles.label}>Cidade:</Text> {endereco.localidade}</Text>
          <Text><Text style={styles.label}>Estado:</Text> {endereco.uf}</Text>
        </View>
      )}
    </View>
  );
}
