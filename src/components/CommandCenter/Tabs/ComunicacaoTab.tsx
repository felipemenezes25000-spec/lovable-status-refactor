import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const ComunicacaoTab = () => {
  const [tipo, setTipo] = useState('Produto');
  const [prioridade, setPrioridade] = useState('P2');
  const [status, setStatus] = useState('Abertura');
  const [produtos, setProdutos] = useState<string[]>(['BTG Banking']);
  const [times, setTimes] = useState<string[]>(['CCBP', 'NOC']);
  const [newProduto, setNewProduto] = useState('');
  const [newTime, setNewTime] = useState('');

  const addProduto = () => {
    if (newProduto.trim()) {
      setProdutos([...produtos, newProduto.trim()]);
      setNewProduto('');
    }
  };

  const addTime = () => {
    if (newTime.trim()) {
      setTimes([...times, newTime.trim()]);
      setNewTime('');
    }
  };

  const removeProduto = (idx: number) => {
    setProdutos(produtos.filter((_, i) => i !== idx));
  };

  const removeTime = (idx: number) => {
    setTimes(times.filter((_, i) => i !== idx));
  };

  const comunicacoes = [
    { tipo: 'Produto', ticket: 'CCBP-101570', prioridade: 'P1', quando: 'Hoje 14:46', status: 'Enviado' },
    { tipo: 'Serviço', ticket: 'CCBP-101569', prioridade: 'P2', quando: 'Hoje 14:39', status: 'Normalizado' },
    { tipo: 'Produto', ticket: 'CCBP-101566', prioridade: 'P1', quando: 'Hoje 13:38', status: 'Acionado' },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <Card className="p-4">
        <h2 className="mb-4 text-xl font-bold">Comunicação via Teams</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Preencha os campos e gere a mensagem de comunicação.
        </p>

        <div className="space-y-4">
          {/* Tipo */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-muted-foreground">Tipo</label>
            <div className="flex gap-2">
              {['Produto', 'Serviço', 'Canal'].map((t) => (
                <Button
                  key={t}
                  variant={tipo === t ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTipo(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          {/* Prioridade */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-muted-foreground">Prioridade</label>
            <div className="flex gap-2">
              {['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].map((p) => (
                <Button
                  key={p}
                  variant={prioridade === p ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPrioridade(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-muted-foreground">Status</label>
            <div className="flex gap-2">
              {['Abertura', 'Atualização', 'Normalizado', 'Reaberto'].map((s) => (
                <Button
                  key={s}
                  variant={status === s ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatus(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                Registro
              </label>
              <Input placeholder="CCBP-101592" />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                Monitor alarmado
              </label>
              <Input placeholder="BTG Empresas" />
            </div>
          </div>

          {/* Produtos afetados */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-muted-foreground">
              Produtos afetados
            </label>
            <div className="flex gap-2">
              <Input
                value={newProduto}
                onChange={(e) => setNewProduto(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addProduto()}
                placeholder="Adicionar produto"
              />
              <Button onClick={addProduto} size="sm">+</Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {produtos.map((produto, idx) => (
                <Badge key={idx} variant="secondary" className="gap-1">
                  {produto}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeProduto(idx)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Times envolvidos */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-muted-foreground">
              Times envolvidos
            </label>
            <div className="flex gap-2">
              <Input
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTime()}
                placeholder="Adicionar time"
              />
              <Button onClick={addTime} size="sm">+</Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {times.map((time, idx) => (
                <Badge key={idx} variant="secondary" className="gap-1">
                  {time}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTime(idx)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Descrição do Impacto */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-muted-foreground">
              Descrição do Impacto
            </label>
            <Textarea
              placeholder="Descreva o impacto do incidente aos clientes e sistemas..."
              rows={3}
            />
          </div>

          {/* Ação de Contorno */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-muted-foreground">
              Ação de Contorno
            </label>
            <Textarea
              placeholder="Descreva as ações aplicadas ou planejadas..."
              rows={3}
            />
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button variant="outline">Limpar</Button>
            <Button variant="outline">Salvar rascunho</Button>
            <Button>Enviar via Teams</Button>
          </div>
        </div>
      </Card>

      {/* Histórico */}
      <Card className="p-4">
        <h3 className="mb-4 font-bold">Histórico de Comunicações</h3>
        <div className="space-y-3">
          {comunicacoes.map((com, idx) => (
            <div key={idx} className="rounded-lg border p-3 hover:bg-accent/5">
              <div className="mb-1 flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {com.ticket}
                </Badge>
                <Badge
                  variant={com.prioridade === 'P1' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {com.prioridade}
                </Badge>
              </div>
              <div className="text-sm font-semibold">{com.tipo}</div>
              <div className="text-xs text-muted-foreground">
                {com.quando} • {com.status}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ComunicacaoTab;