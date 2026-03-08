import toast from 'react-hot-toast';

export async function copyToClipboard(text: string, label = 'Copied!'): Promise<void> {
  await navigator.clipboard.writeText(text);
  toast.success(label);
}
