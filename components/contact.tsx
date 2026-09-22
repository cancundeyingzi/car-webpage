"use client";

import { contactCopy, dialogKickers } from "@/content/contact";
import { useRef, useState } from "react";
import { ArrowUpRight, X, Check, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { contactQQ, proposalTemplate } from "@/content/site";
function CopyButton({
  value,
  label
}: {
  value: string;
  label: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [result, setResult] = useState<{
    value: string;
    success: boolean;
  } | null>(null);
  const copying = useRef(false);
  const copied = result?.value === value && result.success;
  const copyFailed = result?.value === value && !result.success;
  async function copy() {
    if (copying.current) return;
    copying.current = true;
    let success = false;
    try {
      await navigator.clipboard.writeText(value);
      success = true;
    } catch {/* Fall back for HTTP and embedded browsers. */}
    if (!success) {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;";
      const previousFocus = document.activeElement as HTMLElement | null;
      (buttonRef.current?.closest("[role=dialog]") || document.body).appendChild(field);
      try {
        field.focus({
          preventScroll: true
        });
        field.select();
        field.setSelectionRange(0, value.length);
        success = document.execCommand("copy");
      } catch {
        success = false;
      } finally {
        field.remove();
        previousFocus?.focus({
          preventScroll: true
        });
      }
    }
    copying.current = false;
    setResult({
      value,
      success
    });
  }
  return <div className="copy-control">
    <button ref={buttonRef} type="button" className="button button-dark" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? contactCopy.copied : label}</button>
    <span className="copy-status" role="status">{copyFailed ? contactCopy.copyFailed : copied ? contactCopy.copySuccess : ""}</span>
  </div>;
}
function ContactDetails({
  type
}: {
  type: "bounty" | "visit";
}) {
  return <>
    <div className="qq-contact">
      <label>
        {contactCopy.channel}
        <input aria-label={contactCopy.numberAria} readOnly value={contactQQ} onFocus={event => event.target.select()} />
      </label>
      <CopyButton value={contactQQ} label={contactCopy.copyNumber} />
    </div>
    <p className="contact-hint">{type === "bounty" ? contactCopy.bountyHint : contactCopy.visitHint}</p>
  </>;
}
export function ContactSection({
  type
}: {
  type: "bounty" | "visit";
}) {
  return <section className="contact-section reveal" id="contact">
    <div>
      <p className="eyebrow">{contactCopy.eyebrow}</p>
      <h2>{type === "bounty" ? contactCopy.bountyTitle : contactCopy.visitTitle}</h2>
      <p>{type === "bounty" ? contactCopy.bountyIntro : contactCopy.visitIntro}</p>
    </div>
    <div>
      <ContactDetails type={type} />
    </div>
  </section>;
}
export function ParticipationDialog({
  type
}: {
  type: "bounty" | "visit";
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLAnchorElement>(null);
  return <>
    <a ref={trigger} href="#contact" className="button button-dark" onClick={event => {
      event.preventDefault();
      setOpen(true);
    }}>
      {type === "bounty" ? contactCopy.bountyAction : contactCopy.visitAction}
      <ArrowUpRight size={17} />
    </a>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="info-dialog" showCloseButton={false} onCloseAutoFocus={event => {
        event.preventDefault();
        trigger.current?.focus({
          preventScroll: true
        });
      }}>
        <DialogClose className="close-info" aria-label={contactCopy.close}>
          <X size={20} />
        </DialogClose>
        <span className="dialog-kicker">{dialogKickers[type]}</span>
        <DialogTitle>{type === "bounty" ? contactCopy.bountyDialogTitle : contactCopy.visitDialogTitle}</DialogTitle>
        <DialogDescription>{type === "bounty" ? contactCopy.bountyDialogDescription : contactCopy.visitDialogDescription}</DialogDescription>
        <ContactDetails type={type} />
        {type === "bounty" ? <details className="proposal-details">
          <summary>{contactCopy.proposalSummary}</summary>
          <textarea className="proposal-template" aria-label={contactCopy.proposalAria} value={proposalTemplate} readOnly rows={7} />
          <CopyButton value={proposalTemplate} label={contactCopy.copyProposal} />
        </details> : <div className="visit-dialog-note">
          <strong>{contactCopy.visitReminderTitle}</strong>
          <p>{contactCopy.visitReminder}</p>
        </div>}
      </DialogContent>
    </Dialog>
  </>;
}
