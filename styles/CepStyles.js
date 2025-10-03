import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  error: {
    marginTop: 20,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 20,
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, 
  },
  cardLabel: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 16,
  },
  cardText: {
    fontSize: 16,
  },
});

export default styles;
