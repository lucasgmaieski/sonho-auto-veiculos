// const URL_BASE = 'http://138.97.9.237:888';
const URL_BASE = 'http://localhost:888';
export default {
    getMenu: async (id: number) => {
        try{
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/menu/${id}`, { cache: 'no-store' });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const menu = await response.json();
            // console.log(menu[0]);
            return menu || [];
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getPage: async (id: number) => {
        try{
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/pages/${id}`);
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const menu = await response.json();
            // console.log(menu[0]);
            return menu ;
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getVehicles: async () => {
        try{
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/veiculosf`, { next: { revalidate: 3600 } });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const vehicles = await response.json();
            console.log(vehicles[0]);
            return vehicles || [];
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getVehiclesBypParams: async (params: string) => {
        try{
            //http://localhost:888/sonhoautoveiculos.com.br/wp-json/wp/v2/veiculosf/?condicao=novo&page=2&per_page=3
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/veiculosf/?${params}`, { next: { revalidate: 3600 } });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const vehicle = await response.json();
            console.log("vehicle: ")
            console.log(vehicle);
            return vehicle;
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getVehicleBySlug: async (slug: string) => {
        try{
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/veiculos?slug=${slug}`, { next: { revalidate: 3600 } });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const vehicle = await response.json();
            console.log("vehicle: ")
            console.log(vehicle);
            return vehicle[0];
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getQtdVehiclesPerField: async () => {
        try{
            // ano, preco, MARCA, condicao, combustivel, motor, quilometros, transmissao, direcao, cor, portas, *localizacao, *carroceria, 
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/acf/v3/veiculos?_fields=acf.ano,acf.preco,acf.condicao,acf.combustivel,acf.motor,acf.quilometros,acf.transmissao,acf.direcao,acf.cor,acf.portas,acf.marca,acf.tipo`, { next: { revalidate: 360 } });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const vehicleFilters : DadosAPI[] = await response.json();

            interface DadosAPI {
                acf: {
                [campo: string]: string | { name: string };
                };
            }
            interface ContagemPorCampo {
                [campo: string]: {
                [valor: string]: number;
                };
            }
            
            const contagemPorCampo : ContagemPorCampo = {};
            // Itera sobre os dados da API
            vehicleFilters.forEach(item => {
                for (const campo in item.acf) {
                    let valorCampo = item.acf[campo];
                    console.log("campo: " + campo)

                    if ((campo === "marca" || "tipo") && (typeof valorCampo === "object") && ("name" in valorCampo)) {
                        valorCampo = (valorCampo as { name: string }).name;
                      }

                    // Cria um objeto de contagem para o campo, se não existir
                    if (!contagemPorCampo[campo]) {
                        contagemPorCampo[campo] = {};
                    }
            
                    // Atualiza o contador para esse valor no campo
                    contagemPorCampo[campo][valorCampo as string] = (contagemPorCampo[campo][valorCampo as string] || 0) + 1;
                }
            });
            
            // Imprime os resultados
            for (const campo in contagemPorCampo) {
                // console.log(`Contagem para o campo "${campo}":`);
                for (const valor in contagemPorCampo[campo]) {
                    // console.log(`   ${valor}: ${contagemPorCampo[campo][valor]}`);
                }
                // console.log(contagemPorCampo);
            }

            return contagemPorCampo;
        
        } catch (err) {
            console.log(err);
        }


    },
    getQtdVehiclesPerFieldGQL: async () => {
        try{
            const query = `
            query posts {
                allVeiculosGQL {
                    nodes {
                        veiculos {
                            ano
                            combustivel
                            condicao
                            cor
                            direcao
                            motor
                            localizacao
                            portas
                            preco
                            quilometros
                            transmissao
                            marca {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                            tipo {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
            `
            const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer seu_token_de_autenticacao' // Se necessário
                },
                cache: 'no-store'
            });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const { data } = await response.json();
            // ano, preco, MARCA, condicao, combustivel, motor, quilometros, transmissao, direcao, cor, portas, *localizacao, *carroceria, 
            console.log("dataaaaaaaaaa:");
            console.log(data);
            console.log(data.allVeiculosGQL.nodes);
            console.log("opaaaaaaaaaaaaaaa ",data.allVeiculosGQL.nodes[0].veiculos.marca.edges[0].node.name);
            const vehicleFilters : DadosAPI[] = data.allVeiculosGQL.nodes;

            interface DadosAPI {
                veiculos: {
                [campo: string]: string | { edges:[{node: {name: string}}] };
                };
            }
            interface ContagemPorCampo {
                [campo: string]: {
                [valor: string]: number;
                };
            }
            
            const contagemPorCampo : ContagemPorCampo = {};
            // Itera sobre os dados da API
            vehicleFilters.forEach(item => {
                for (const campo in item.veiculos) {
                    let valorCampo = item.veiculos[campo] ?? '';
                    console.log("campo: " + campo)

                    if ((campo === "marca" || "tipo") && (typeof valorCampo === "object") && ("edges" in valorCampo)) {
                        valorCampo = (valorCampo as { edges:[{node: {name: string}}] }).edges[0].node.name;
                      }

                    // Cria um objeto de contagem para o campo, se não existir
                    if (!contagemPorCampo[campo]) {
                        contagemPorCampo[campo] = {};
                    }
            
                    // Atualiza o contador para esse valor no campo
                    contagemPorCampo[campo][valorCampo as string] = (contagemPorCampo[campo][valorCampo as string] || 0) + 1;
                }
            });
            
            // Imprime os resultados
            for (const campo in contagemPorCampo) {
                // console.log(`Contagem para o campo "${campo}":`);
                for (const valor in contagemPorCampo[campo]) {
                    console.log(`   ${valor}: ${contagemPorCampo[campo][valor]}`);
                }
            }

            return contagemPorCampo;
        } catch (err) {
            console.log(err);
        }
    },
    getVehiclesByParamsGQL: async (params: string) => {
        try{
            const query = `
            query BuscarVeiculos(${params}) {
                veiculos(where: { 
                  metaQuery: {
                    relation: AND
                    args: [
                      { key: "preco", value: $preco, compare: BETWEEN },
                      { key: "ano", value: $ano, compare: BETWEEN },
                      { key: "quilometros", value: $quilometros, compare: BETWEEN }
                    ]
                  },
                  marcaTaxQuery: {
                    relation: AND
                    args: [{ taxonomy: MARCAS, terms: $marca, operator: IN }]
                  },
                  tipoTaxQuery: {
                    relation: AND
                    args: [{ taxonomy: TIPOS, terms: $tipo, operator: IN }]
                  }
                }) {
                  nodes {
                    id
                    title
                    veiculos {
                        ano
                        combustivel
                        condicao
                        cor
                        direcao
                        motor
                        localizacao
                        portas
                        preco
                        quilometros
                        transmissao
                      }
                    permalink
                    featuredImage {
                      sourceUrl
                    }
                  }
                }
              }
              `
            const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const vehicle = await response.json();
            console.log("vehicle: ")
            console.log(vehicle);
            return vehicle;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getMenuMarcasGQL: async () => {
        try{
            const query = `
            query MenMarcas {
                opcoespageMenuMarca {
                  acf {
                    itens {
                      logo
                      nome
                    }
                  }
                }
              }
              `
            const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const menMarcas = await response.json();
            console.log("menMarcas: ")
            console.log(menMarcas);
            return menMarcas;
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getMenuTiposGQL: async () => {
        try{
            const query = `
            query MenuTipos {
                opcoespageMenuTipo {
                  acf {
                    itens {
                      logo
                      nome
                    }
                  }
                }
              }
              `
            const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const menuTipos = await response.json();
            console.log("menuTipos: ")
            console.log(menuTipos);
            return menuTipos;
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getMarcaFilterGQL: async () => {
        try{
            const query = `
            query MarcaFilter {
                allMarcasGQL {
                  nodes {
                    name
                    count
                    marcas {
                      logo {
                        node {
                          mediaItemUrl
                        }
                      }
                    }
                  }
                }
              }
              `
            const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const marcaFilter = await response.json();
            console.log("marcaFilter2: ")
            console.log(marcaFilter.data.allMarcasGQL.nodes);
            return marcaFilter.data.allMarcasGQL.nodes;
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
}