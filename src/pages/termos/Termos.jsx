import styles from "./Termos.module.css";

export default function Termos() {
  return (
    <main className={styles.pagetp}>
      <div className={styles.container}>
        <h1>Termos de Uso - AdoteVale</h1>

        <p>
          Seja bem-vindo ao AdoteVale. Ao utilizar nossa plataforma e cadastrar
          um animal para adoção, você declara que leu, compreendeu e concorda
          integralmente com os presentes Termos de Uso.
        </p>

        <h2>1. Natureza do serviço</h2>
        <p>
          O AdoteVale atua exclusivamente como uma plataforma de intermediação
          entre pessoas que desejam doar animais e pessoas interessadas em
          adotá-los. O AdoteVale não participa das negociações, não realiza
          adoções, não transporta animais e não se responsabiliza pelas
          tratativas realizadas fora da plataforma.
        </p>

        <h2>2. Cadastro de animais</h2>
        <p>
          O AdoteVale não exige criação de conta de usuário. O cadastro é
          realizado apenas para o animal, mediante o preenchimento de
          informações como nome, imagem, sexo, idade aproximada, espécie, porte,
          status de vacinação, castração e número de WhatsApp para contato.
        </p>

        <ul>
          <li>
            O responsável pelo anúncio declara que todas as informações
            fornecidas são verdadeiras, completas e atualizadas.
          </li>
          <li>
            Ao marcar o campo de aceite no formulário, o usuário confirma que
            concorda com estes Termos de Uso.
          </li>
          <li>
            É expressamente proibido o cadastro de animais silvestres, exóticos
            ou cuja adoção seja vedada por lei.
          </li>
          <li>
            Todos os anúncios passam por análise antes da publicação e podem ser
            recusados ou removidos a qualquer momento, sem aviso prévio.
          </li>
        </ul>

        <h2>3. Proibição de venda de animais</h2>
        <p>
          O AdoteVale não permite, em nenhuma hipótese, a venda de animais.
          Qualquer tentativa de comercialização, direta ou indireta, resultará
          na remoção imediata do anúncio.
        </p>

        <p>
          Caso um usuário ou interessado identifique indícios de venda durante o
          contato via WhatsApp ou outros meios, deverá comunicar o AdoteVale
          para que o anúncio seja removido.
        </p>

        <h2>4. Comunicação, aprovação e exclusão de anúncios</h2>
        <p>
          Todos os anúncios cadastrados no AdoteVale passam por uma análise
          prévia antes da publicação.
        </p>

        <p>
          Após a aprovação do anúncio, o AdoteVale poderá enviar uma mensagem de
          confirmação para o número de WhatsApp informado no cadastro, para fins
          de comunicação e moderação do anúncio.
        </p>

        <p>
          Como não há contas de usuário, a exclusão de anúncios deve ser
          solicitada por meio de comunicação direta com o AdoteVale,
          preferencialmente pelas redes sociais oficiais ou pelo canal informado
          na mensagem de aprovação.
        </p>

        <p>
          A remoção dos anúncios é realizada manualmente. O AdoteVale não se
          responsabiliza por atrasos na exclusão decorrentes da ausência de
          comunicação por parte do responsável pelo anúncio.
        </p>

        <h2>5. Responsabilidade sobre o status do animal</h2>
        <p>
          É de responsabilidade exclusiva do anunciante informar ao AdoteVale
          quando o animal for adotado, quando a doação for cancelada ou quando o
          anúncio deixar de ser válido por qualquer motivo.
        </p>

        <p>
          Caso a doação seja cancelada ou o animal não esteja mais disponível, o
          responsável pelo anúncio compromete-se a comunicar o AdoteVale para
          que o anúncio seja retirado de circulação.
        </p>

        <p>
          Caso o responsável não realize essa comunicação, o anúncio permanecerá
          ativo, e o anunciante poderá continuar recebendo mensagens e contatos
          via WhatsApp.
        </p>

        <p>
          O AdoteVale não se responsabiliza por qualquer inconveniente
          decorrente da manutenção do anúncio ativo por falta de aviso.
        </p>

        <h2>6. Limitação de responsabilidade</h2>
        <ul>
          <li>
            O AdoteVale não se responsabiliza por condutas, acordos, danos,
            prejuízos ou conflitos decorrentes do contato entre usuários.
          </li>
          <li>
            Toda interação ocorre fora da plataforma, especialmente via
            WhatsApp, sendo de inteira responsabilidade das partes envolvidas.
          </li>
          <li>
            O AdoteVale não garante a adoção, a veracidade absoluta das
            informações fornecidas ou o comportamento dos envolvidos.
          </li>
        </ul>

        <h2>7. Conformidade legal</h2>
        <p>
          O usuário declara estar ciente e cumprir toda a legislação aplicável
          relacionada à adoção de animais, bem-estar animal e normas ambientais.
          O AdoteVale reserva-se o direito de remover qualquer anúncio que viole
          a legislação vigente.
        </p>

        <h2>8. Alterações neste Termo de Uso</h2>
        <p>
          O AdoteVale poderá atualizar este Termo de Uso a qualquer momento,
          sendo recomendada a revisão periódica deste conteúdo.
        </p>

        <p>
          Ao utilizar o AdoteVale, o usuário confirma que leu, compreendeu e
          concorda integralmente com estes Termos de Uso, assumindo total
          responsabilidade pelas informações prestadas e pelas interações
          decorrentes do anúncio.
        </p>
      </div>
      <div className={styles.divider}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={styles.dividerSvg}
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28 70.36-5.37,136.33-33.31,206.8-37.5 C438.64,32.43,512.34,53.67,583,72.05 c69.27,18,138.3,24.88,209.4,13.08 36.15-6,69.85-17.84,104.45-29.34 C989.49,25,1113-14.29,1200,52.47V0Z"
            className={`${styles.shape} ${styles.wave1}`}
          />
          <path
            d="M0,0V15.81C47,42,104,68,167,76 256,87,342,58,421,34 486,15,562,0,636,7 702,13,768,40,838,61 916,84,996,85,1200,40V0Z"
            className={`${styles.shape} ${styles.wave2}`}
          />
          <path
            d="M0,0V5.63C150,59,314,71,476,43 606,20,720,5,856,18 992,32,1096,11,1200,0V0Z"
            className={`${styles.shape} ${styles.wave3}`}
          />
        </svg>
      </div>
    </main>
  );
}
