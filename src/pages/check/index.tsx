import { getParticipationList } from "@/app/services/server_participants";
import { TConvertToExcel, convertToExcel, convertToXLSX } from "@/app/services/storageUtils";
import { TCellValue, TRowValue, defaultScreenConfiguration } from "@/app/types";
import { NextRequest, NextResponse } from "next/server"
import '@/app/scss/bootstrap.scss'
import { MouseEvent, useRef, useState } from "react";
import { useAuthService } from "@/app/services/auth";
import { TProject, getListParticipantListFromServer, getProjectListFromServer } from "@/app/services/api";

/*
export const getServerSideProps = async function (req: NextRequest, res: NextResponse) {


    const data = await getParticipationList("la institucion arreglada");
    return {
        props: {
            data: JSON.stringify(data)
        }

    };
}
*/


const Index = () => {


    const screenConf = defaultScreenConfiguration; //TODO: ANGEL ver la forma de obtener esto de manera genérica




    const descargar = (dataForExport: TConvertToExcel[]) => {

        const curated = convertToExcel(dataForExport)
        const CSVFile = new Blob([curated], { type: "text/csv" });
        const temp_link = window.document.createElement("a");

        // Download csv file
        temp_link.download = "participantes.csv";
        const url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        window.document.body.appendChild(temp_link);

        // Automatically click the link to trigger download
        temp_link.click();
        window.document.body.removeChild(temp_link);
    }

    const userRef = useRef<any>();
    const pwdRef = useRef<any>();
    const errorRef = useRef<string>("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [projectList, setProjectList] = useState<TProject[]>([]);
    const [showLogin, setShowLogin] = useState<boolean>(true);
    const [tokenIdSec, setTokenIdSec] = useState<string>("");
    const { singInUser } = useAuthService();

    const downloadParticipationList = async (pProjectId: string, tokenId: string) => {
        const dataResp = await getListParticipantListFromServer("unownerid", tokenId, pProjectId) //TODO: Angel - definir el owner id
        const data = dataResp.data as {
            organizacion: string,
            maininfo: TCellValue[],
            participantes: TRowValue[]
        }[];
        const dataForExport = data.map((d): TConvertToExcel => {
            return {
                organizacion: d.organizacion,
                screenConf: {
                    colDefinition: screenConf.colDefinition,
                    formData: d.maininfo,
                    formDefinition: screenConf.formDefinition,
                    listData: d.participantes
                }
            }
        });

        convertToXLSX(dataForExport);
    }

    const loginHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        errorRef.current = "";
        const user = userRef.current?.value;
        const pwd = pwdRef.current?.value;
        if (user && pwd) {
            setIsSigningIn(true);
            try {
                const tokenId = await singInUser(user, pwd); //const userInfo = await singInUser(user, pwd);
                pwdRef.current.value = "";
                //userRef.current.value = "";

                //downloadParticipationList("", tokenId);
                const projectList = await getProjectListFromServer("unownerid", tokenId); //TODO angel: deshardcoear
                //console.log("project list ", projectList)
                setProjectList(projectList.data);
                setShowLogin(false);
                setTokenIdSec(tokenId);

            } catch (error) {
                console.log('errorrrrrr', error)
                errorRef.current = "Usuario/password inválidos"
            } finally {
                setIsSigningIn(false);
            }
        }
    }





    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-2 text-left'>
                        <img alt="logo inscripcion" className="img-fluid" src="/imgs/logo.png" />
                    </div>
                    <div className='col-8'>
                        <h1 className="d-sm-none d-none d-md-block">
                            <strong>

                                DESCARGAS
                            </strong>
                        </h1>
                        <h2 className="d-sm-block d-md-none">
                            <strong>

                                DESCARGAS
                            </strong>
                        </h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        {showLogin && <div className="col-md-6">

                            <form >
                                <input type="hidden" name="_token" />
                                <div className="form-group">
                                    <label className="control-label">Usuario</label>
                                    <div>
                                        <input ref={userRef} type="email" className="form-control input-lg" name="email" placeholder="dirección de e-mail" data-testid="user-input" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label" >Password</label>
                                    <div>
                                        <input ref={pwdRef} type="password" className="form-control input-lg" name="password" placeholder="password" data-testid="password-input" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div>
                                        <p>&nbsp;<span className='badge badge-danger'>{errorRef.current}</span></p>
                                        <button data-testid="login-button" disabled={isSigningIn} onClick={loginHandler} className="btn btn-success">Descargar</button>


                                    </div>
                                </div>
                            </form>
                        </div>}
                        {!showLogin && projectList.length > 0 && <div className="col-md-6">
                            <h3>Lista de eventos</h3>
                            {projectList.map(p => <div className="row pt-2">
                                <div className="col-md-9">{p.name}</div>
                                <div className="col-md-3">
                                    <button
                                        onClick={() => downloadParticipationList(p.id, tokenIdSec)}
                                        className="btn btn-secondary">descargar</button>
                                </div>
                            </div>)}
                        </div>}
                        <div className="col-md-3">

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Index